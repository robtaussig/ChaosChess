import React from 'react';
import { ChaosGameTypes, gameStarted } from '../../redux/Game';
import { userUpdated } from '../../redux/User';
import { OpponentType } from '../../redux/Opponent';
import { moveCompleted } from '../../redux/Chess'
import { setHeader } from '../../redux/Header';
import { Board, Color } from '../../engine/types';
import { findLegalMoves, isCheck } from '../../engine';
import ChaosBase from '../chaos-base';
import Component from './components/game-modal';
import { GamePhase } from './types';
import messager from '../../messaging/dispatcher';
import { isMessageType } from '../../messaging/util';
import { syncGuestWithGameStarted } from '../../messaging';
import { removeMoveThatCapturesKing } from '../lib/chaosUtils';
const PLAYER_PICKING_COLOR = '.';

enum MessageTypes {
  Bet = 'Bet',
  Start = 'Start',
}

export default class RankedChaos extends ChaosBase {
  public static gameName = 'Ranked Chaos';
  public static description = `Both players begin with a currency. Instead of taking turns playing as white, both players bid an amount (up to 10 units) that they believe reflects the advantage of white, the first to move. The lowest bid takes control of white, and both bids are placed into a pot to be paid out to the winner. If both players bid the max amount, a new random board is generated.`;
  public static subType = ChaosGameTypes.RankedChaos;
  protected movesMade: number = -1;
  private phase: GamePhase = null;
  private unsubscribe: () => void = null;
  private hostBet: number = null;
  private guestBet: number = null;
  private totalBet: number = null;
  private isWhite: boolean = null;
  private budget: number = 100;

  public init() {
    this.phase = GamePhase.Betting;

    this.dispatch(userUpdated({
      color: PLAYER_PICKING_COLOR,
    }));

    const unsubscribe = messager.subscribe(this.receiveMessage.bind(this));

    this.unsubscribe = unsubscribe.bind(this);
  }

  public deinit() {
    this.unsubscribe();
  }

  public filterLegalMoves = (moves: string[], board: Board): string[] => {
    if (this.movesMade === -1) return [];

    return moves;
  };

  private handleBet = (
    isHost: boolean,
  ) => 
    (amount: number) => {
      this.phase = GamePhase.WaitingForOtherPlayer;
      if (isHost) {
        this.hostBet = amount;
        if (this.guestBet !== null) {
          this.handleBets();
        }
      } else {
        this.sendMessage(`${MessageTypes.Bet}||${amount}`);
      }
    }

  private handleBets () {
    const totalBet = this.hostBet + this.guestBet;
    if (this.hostBet > this.guestBet) {
      this.startPlaying(Color.White, totalBet, this.hostBet);
      this.sendMessage(`${MessageTypes.Start}||${Color.Black}||${totalBet}||${this.guestBet}`);
    } else if (this.guestBet > this.hostBet) {
      this.startPlaying(Color.Black, totalBet, this.hostBet);
      this.sendMessage(`${MessageTypes.Start}||${Color.White}||${totalBet}||${this.guestBet}`);
    } else {
      this.startOver();
    }
    this.hostBet = null;
    this.guestBet = null;
  }

  private receiveMessage(message: string) {
    if (isMessageType<MessageTypes>(message, MessageTypes.Bet)) {
      const [,amount] = message.split('||');
      this.guestBet = Number(amount);
      if (this.hostBet !== null) this.handleBets();
    } else if (isMessageType<MessageTypes>(message, MessageTypes.Start)) {
      const [,color, totalBet, ourBet] = message.split('||');
      this.startPlaying(color as Color, Number(totalBet), Number(ourBet));
    }
  }

  private startOver() {    
    this.dispatch(gameStarted({ opponent: OpponentType.Human, isWhite: true }));
    syncGuestWithGameStarted(
      this.sendMessage,
      false,
    );
  }

  private async startPlaying(color: Color, totalBet: number, ourBet: number) {
    this.isWhite = color === Color.White;
    this.totalBet = totalBet;
    this.budget -= ourBet;
    this.phase = GamePhase.Playing;
    this.movesMade++;

    this.dispatch(setHeader(`$${ourBet} in to win $${totalBet}`));

    this.dispatch(moveCompleted({
      from: null,
      to: null,
      board: this.board,
      legalMoves: this.isWhite ? removeMoveThatCapturesKing(findLegalMoves(this.board), this.board) : null,
      isCheck: isCheck(this.board),
    }));

    this.dispatch(userUpdated({
      color: this.isWhite ? Color.White : Color.Black,
    }));
  }

  public render (board: Board, color: Color, isHost: boolean): JSX.Element {
    this.board = board;

    return (
      <Component
        board={board}
        color={color}
        isHost={isHost}
        budget={this.budget}
        phase={this.phase}
        onBet={this.handleBet(isHost)}
      />
    );
  }
}

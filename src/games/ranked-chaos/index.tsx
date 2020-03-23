import React from 'react';
import { ChaosGameTypes } from '../../redux/Game';
import { userUpdated } from '../../redux/User';
import { Board, Color } from '../../engine/types';
import ChaosBase from '../chaos-base';
import Component from './components/game-modal';
import { GamePhase } from './types';

const PLAYER_PICKING_COLOR = '.';

export default class RankedChaos extends ChaosBase {
  public static gameName = 'Ranked Chaos';
  public static description = `Both players begin with a currency. Instead of taking turns playing as white, both players bid an amount (up to 10 units) that they believe reflects the advantage of white, the first to move. The lowest bid takes control of white, and both bids are placed into a pot to be paid out to the winner. If both players bid the max amount, a new random board is generated.`;
  public static subType = ChaosGameTypes.RankedChaos;
  private turnCount: number = -1;
  private phase: GamePhase = GamePhase.Betting;

  protected init() {
    this.dispatch(userUpdated({
      color: PLAYER_PICKING_COLOR,
    }));
  }

  public filterLegalMoves = (moves: string[], board: Board): string[] => {
    if (this.turnCount === -1) return [];

    return moves;
  };

  private handleBet = (
    board: Board,
    color: Color,
    isHost: boolean,
  ) => 
    (amount: number) => {

    }

  public render = (board: Board, color: Color, isHost: boolean): JSX.Element => {
    return (
      <Component
        board={board}
        color={color}
        isHost={isHost}
        phase={this.phase}
        onBet={this.handleBet(board, color, isHost)}
      />
    );
  }
}

import { BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';
import { getChaoticBoard, removeMoveThatCapturesKing } from './lib/chaosUtils';

export default class ChaosBase extends BaseGame {
  public static type = GameTypes.Chaos;
  public static initialBoard = BoardTypes.Random;
  protected movesMade: number = 0;

  public moveMade = (board: Board): Board => {
    this.movesMade++;
    return board;
  }

  //Prevent capture of king on first move for white
  public filterLegalMoves = (moves: string[], board: Board): string[] => {
    if (this.movesMade === 0) {
      return removeMoveThatCapturesKing(moves, board);
    }
    
    return moves;
  }

  public generateInitialBoard() {
    return getChaoticBoard();
  }
}

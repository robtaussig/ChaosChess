import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';

export default class EightKnights extends BaseGame {
  public static gameName = 'Eight Knights';
  public static description: `Both players begin the game with 8 knights and a
                              king. After 20 turns, a random knight will
                              transform in a queen for both sides. First to
                              checkmate wins.`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.EightKnights;
  public static initialBoard = BoardTypes.Custom;
  public static previewComponent: JSX.Element = null;

  constructor(
    readonly movesUntilTransform: number = 40,
  ) {
    super();
  }

  public moveMade = (board: Board): Board => {
    if (this.movesUntilTransform === 0) return this.transformBoard(board);
    return board;
  }

  //TODO
  private transformBoard = (board: Board): Board => {
    return board;
  }

  public async generateInitialBoard() {
    return '00000000000----k---00nnnnnnnn00--------00--------00--------00--------00NNNNNNNN00----K---0000000000000000000000';
  }
}

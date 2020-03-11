import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import { DEFAULT_BOARD } from '../engine/constants';
import BaseGame from './base';
import { getChaoticBoard } from './lib/chaosUtils';

export default class Regular extends BaseGame {
  public static gameName = 'Regular';
  public static description = `The standard rules of chess. Boring!`;
  public static type = GameTypes.Regular;
  public static initialBoard = BoardTypes.Normal;
  public static previewComponent: JSX.Element = null;
  //TODO
  public moveMade = (board: Board): Board => {
    return board;
  }

  public async generateInitialBoard() {
    return DEFAULT_BOARD;
  }
}

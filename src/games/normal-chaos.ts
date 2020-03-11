import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';
import { getChaoticBoard } from './lib/chaosUtils';

export default class NormalChaos extends BaseGame {
  public static gameName = 'Chaos Normal';
  public static description = `The standard variation of Chaos Chess. Board is randomized, and each players take turns playing white. Games can begin in checkmate!`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.Normal;
  public static initialBoard = BoardTypes.Random;
  public static previewComponent: JSX.Element = null;

  //TODO
  public moveMade = (board: Board): Board => {
    return board;
  }

  public generateInitialBoard() {
    return getChaoticBoard();
  }
}

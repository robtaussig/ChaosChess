import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';
import { getChaoticBoard } from './lib/chaosUtils';

export default class SemiChaos extends BaseGame {
  public static gameName = 'Semi-Chaos';
  public static description: `Similar to standard Chaos, semi-chaos allows for
                              the 'capture' of pieces during the initial random
                              placement. This leads to more open initial baords
                              and slightly longer games.`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.SemiChaos;
  public static initialBoard = BoardTypes.Random;
  public static previewComponent: JSX.Element = null;

  //TODO
  public moveMade = (board: Board): Board => {
    return board;
  }

  //TODO
  public generateInitialBoard() {
    return getChaoticBoard();
  }
}

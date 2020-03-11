import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';
import { getChaoticBoard } from './lib/chaosUtils';

export default class ChaosDraft extends BaseGame {
  public static gameName = 'Chaos Draft';
  public static description: `Both players begin with currency that can be used to
                      purchase advantages throughout the game. To claim the
                      final prize, a player must win 10 games.`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.Draft;
  public static initialBoard = BoardTypes.Random;
  public static previewComponent: JSX.Element = null;

  //TODO
  public moveMade = (board: Board): Board => {
    return board;
  }

  public async generateInitialBoard() {
    return getChaoticBoard();
  }
}

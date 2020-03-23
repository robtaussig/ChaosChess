import { ChaosGameTypes } from '../redux/Game';
import ChaosBase from './chaos-base';
import { getSemiChaoticBoard } from './lib/chaosUtils';

export default class SemiChaos extends ChaosBase {
  public static gameName = 'Semi-Chaos';
  public static description = `Similar to standard Chaos, semi-chaos allows for the 'capture' of pieces during the initial random placement. This leads to more open initial boards and slightly longer games.`;
  public static subType = ChaosGameTypes.SemiChaos;

  public generateInitialBoard() {
    return getSemiChaoticBoard();
  }
}

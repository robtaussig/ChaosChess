import { ChaosGameTypes } from '../redux/Game';
import ChaosBase from './chaos-base';

export default class NormalChaos extends ChaosBase {
  public static gameName = 'Chaos Normal';
  public static description = `The standard variation of Chaos Chess. Board is randomized, and both players take turns playing white. Games can begin in checkmate!`;
  public static subType = ChaosGameTypes.Normal;
}

import { ChaosGameTypes } from '../redux/Game';
import ChaosBase from './chaos-base';

export default class ChaosDraft extends ChaosBase {
  public static gameName = 'Chaos Draft';
  public static description = `Both players begin with currency that can be used to purchase advantages throughout the game. To claim the final prize, a player must win 10 games.`;
  public static subType = ChaosGameTypes.Draft;
}

import { GameTypes, ChaosGameTypes } from '../redux/Game';
import BaseGame from './base';
import Regular from './regular';
import NormalChaos from './normal-chaos';
import DraftChaos from './draft';
import EightKnights from './eight-knights';
import RankedChaos from './ranked-chaos';
import SemiChaos from './semi-chaos';

export const getGameGenerator = (gameType: GameTypes, subType?: ChaosGameTypes): BaseGame => {
  switch (gameType) {
    case GameTypes.Regular:
      return new Regular();

    case GameTypes.Chaos:
      switch (subType) {
        case ChaosGameTypes.Normal:
          return new NormalChaos();
        case ChaosGameTypes.Draft:
          return new DraftChaos();
        case ChaosGameTypes.EightKnights:
          return new EightKnights();
        case ChaosGameTypes.RankedChaos:
          return new RankedChaos();
        case ChaosGameTypes.SemiChaos:
          return new SemiChaos();
        default:
          throw new Error(`Unrecognized sub game type: ${subType}`);
      }
  
    default:
      throw new Error(`Unrecognized game type: ${gameType}`);
  }
};

export { BaseGame };

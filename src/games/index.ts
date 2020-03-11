import { GameTypes, ChaosGameTypes, BoardTypes } from '../redux/Game';
import BaseGame from './base';
import Regular from './regular';
import NormalChaos from './normal-chaos';
import DraftChaos from './draft';
import EightKnights from './eight-knights';
import RankedChaos from './ranked-chaos';
import SemiChaos from './semi-chaos';

interface GameInformation {
  gameName: string;
  description: string;
  initialBoard: BoardTypes;
  previewComponent: JSX.Element;
}

export const getGameInformation = (gameType: GameTypes, subType?: ChaosGameTypes): GameInformation => {
  
  switch (gameType) {
    case GameTypes.Regular:
      return Regular;  
    
    case GameTypes.Chaos:
      switch (subType) {
        case ChaosGameTypes.Normal:
          return NormalChaos;  

        case ChaosGameTypes.Draft:
          return DraftChaos;  

        case ChaosGameTypes.EightKnights:
          return EightKnights;  

        case ChaosGameTypes.RankedChaos:
          return RankedChaos;  

        case ChaosGameTypes.SemiChaos:
          return SemiChaos;  

        default:
          throw new Error(`Unrecognized sub game type: ${subType}`);
      }
  
    default:
      throw new Error(`Unrecognized game type: ${gameType}`);
  }
};

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

export const CHAOS_GAME_OPTIONS = [
  ChaosGameTypes.Normal,
  ChaosGameTypes.Draft,
  ChaosGameTypes.EightKnights,
  ChaosGameTypes.RankedChaos,
  ChaosGameTypes.SemiChaos,
];

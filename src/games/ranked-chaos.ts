import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board } from '../engine/types';
import BaseGame from './base';
import { getChaoticBoard } from './lib/chaosUtils';

export default class RankedChaos extends BaseGame {
  public static gameName = 'Ranked Chaos';
  public static description = `Both players begin with a currency. Instead of taking turns playing as white, both players bid an amount (up to 10 units) that they believe reflects the advantage of white, the first to move. The lowest bid takes control of white, and both bids are placed into a pot to be paid out to the winner. If both players bid the max amount, a new random board is generated.`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.RankedChaos;
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

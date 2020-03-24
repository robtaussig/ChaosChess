import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board, Color } from '../engine/types';
import { DEFAULT_BOARD } from '../engine/constants';
import { Dispatch } from 'redux';
import { SendMessage } from '../hooks/useSocket';

export default class BaseGame {
  public static gameName: string;
  public static description: string;
  public static type: GameTypes;
  public static subType: ChaosGameTypes;
  public static initialBoard: BoardTypes;
  public static previewComponent: JSX.Element;
  protected board: Board = null;
  
  public engineDifficulty: number = 4;

  constructor(
    readonly dispatch?: Dispatch<any>,
    readonly sendMessage?: SendMessage,
  ) {}

  public init() {}
  public deinit() {}
  public moveMade = (board: Board): Board => board;
  public filterLegalMoves = (moves: string[], board: Board): string[] => moves;
  public async generateInitialBoard() {
    return DEFAULT_BOARD;
  }

  public render(board: Board, color: Color, isHost: boolean): JSX.Element {
    return null;
  }
}

import { ChaosGameTypes, BoardTypes, GameTypes } from '../redux/Game';
import { Board, WhitePieces, BlackPieces } from '../engine/types';
import {
  BIT_ON,
  WHITE_KING_MOVED_BIT,
  BLACK_KING_MOVED_BIT,
} from '../engine/constants';
import BaseGame from './base';
import { isCheck } from '../engine';
import { transformRandomPiece } from './lib/chaosUtils';
import { updateBoard } from '../engine/board';

export default class SevenKnights extends BaseGame {
  public static gameName = 'Protect the Pawn';
  public static description = `Both players begin the game with 5 knights, 2 bishops, a king, and a pawn. After each player's 10th turn, their pawn will transform into a rook, and then into a queen after another 10 turns. First to checkmate wins.`;
  public static type = GameTypes.Chaos;
  public static subType = ChaosGameTypes.SevenKnights;
  public static initialBoard = BoardTypes.Custom;
  public static previewComponent: JSX.Element = null;
  
  private movesUntilTransform: number = 20;
  private transformToQueen: boolean = false;
  public engineDifficulty: number = 4;

  public moveMade = (board: Board): Board => {
    this.movesUntilTransform--;
    if (this.movesUntilTransform === 0) return this.transformBoard(board);
    return board;
  }

  private transformBoard = (board: Board): Board => {
    this.movesUntilTransform = 10;
    const nextBoard = transformRandomPiece(
      transformRandomPiece(
        board,
        this.transformToQueen ?
          BlackPieces.Rook :
          BlackPieces.Pawn,
          this.transformToQueen ?
            BlackPieces.Queen :
            BlackPieces.Rook,
      ),
      this.transformToQueen ?
          WhitePieces.Rook :
          WhitePieces.Pawn,
          this.transformToQueen ?
            WhitePieces.Queen :
            WhitePieces.Rook,
    );

    this.transformToQueen = true;
    return nextBoard;
  }

  public async generateInitialBoard() {
    return updateBoard(
      updateBoard(
        '00000000000-----nnp00-----nnn00-----knn00--------00--------00NNK-----00NNN-----00PNN-----0000000000000000000000',
        WHITE_KING_MOVED_BIT, //Prevent castling
        BIT_ON,
      ),
      BLACK_KING_MOVED_BIT, //Prevent castling
      BIT_ON,
    );
  }
}

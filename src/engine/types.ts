export type WhitePieceMap<T> = Record<WhitePieces, T>;
export type BlackPieceMap<T> = Record<BlackPieces, T>;
export type PieceMap<T> = Record<Piece, T>;

export enum Color {
  White = 'w',
  Black = 'b',
}

export enum WhitePieces {
  King = 'K',
  Queen = 'Q',
  Rook = 'R',
  Bishop = 'B',
  Knight = 'N',
  Pawn = 'P',
}

export enum BlackPieces {
  King = 'k',
  Queen = 'q',
  Rook = 'r',
  Bishop = 'b',
  Knight = 'n',
  Pawn = 'p',
}

export enum SpecialSquares {
  Empty = '-',
  Boundary = '0',
}

export const A8Square = 11;
export const H1Square = 88;
export type Piece = WhitePieces | BlackPieces | string;
export type Move = string;
export type Board = string;
export type Square = number;
export type MoveIncrement = number;

export const CurrentColorBit = {
  position: 100,
  White: '0',
  Black: '1',
};

export interface ValidMovesPayload {
  legalMoves: Move[];
  isCheck: boolean;
}

export interface WorkerInterface {
  getValidMoves: (board: Board) => ValidMovesPayload;
  getBestMove: (board: Board, depth?: number) => [number, Move];
}

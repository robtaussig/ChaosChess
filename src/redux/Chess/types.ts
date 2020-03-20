export interface ChessState {
  isCheck: boolean;
  board: string;
  legalMoves: string[];
  validPiecesToMove: string[];
  lastRejectedMove: string;
  nodesExplored: number;
  turnsElapsed: number;
  lastCapturedPiece: [number, string];
}

export interface ChessResponse {
  isCheck: boolean;
  legalMoves: string[];
  bestMove?: string;
  nodesExplored?: number;
  fromCache?: boolean;
  isOpeningBook?: boolean;
  timeElapsed?: number;
}

export type InitializeGamePayload = {
  board: string;
  legalMoves: string[];
  validPiecesToMove: string[];
  isCheck: boolean;
}

export enum WhitePieces {
  King = 'k',
  Queen = 'q',
  Rook = 'r',
  Bishop = 'b',
  Knight = 'n',
  Pawn = 'p',
};

export enum BlackPieces {
  King = 'K',
  Queen = 'Q',
  Rook = 'R',
  Bishop = 'B',
  Knight = 'N',
  Pawn = 'P',
}

export type MakeMovePayload = {
  from: number;
  to: number;
  board: string;
  isCheck: boolean;
  legalMoves: string[];
};

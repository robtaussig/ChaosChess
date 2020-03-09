export interface ChessState {
  isCheck: boolean;
  board: string;
  legalMoves: string[];
  validPiecesToMove: string[];
  lastRejectedMove: string;
  nodesExplored: number;
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

export type MoveAttemptedPayload = {
  from: number;
  to: number;
}

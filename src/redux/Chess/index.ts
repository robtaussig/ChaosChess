import { RootState } from '../types';
import chessReducer from './reducer';

export const {
  gameInitialized,
  moveAttempted,
  moveReceived,
  legalMovesReceived,
} = chessReducer.actions;

export const reducer = chessReducer.reducer;

export const chessSelector = (state: RootState) => state.chess;

export { ChessState, ChessResponse } from './types';

export { DEFAULT_BOARD, CONSTANTS } from './constants';

export { getValidPiecesToMoveFromLegalMoveList } from './util';

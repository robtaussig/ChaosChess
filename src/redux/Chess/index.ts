import { RootState } from '../types';
import chessReducer from './reducer';

export const {
  gameInitialized,
  moveAttempted,
  moveReceived,
  legalMovesReceived,
  specialBoardCreated,
} = chessReducer.actions;

export const reducer = chessReducer.reducer;

export const chessSelector = (state: RootState) => state.chess;

export {
  ChessState,
  ChessResponse,
  WhitePieces,
  BlackPieces,
} from './types';

export { DEFAULT_BOARD, EMPTY_BOARD } from '../../engine/constants';

export { getValidPiecesToMoveFromLegalMoveList } from './util';

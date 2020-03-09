import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChessState,
  MoveAttemptedPayload,
  ChessResponse,
} from './types';
import { DEFAULT_BOARD, CONSTANTS } from './constants';
import {
  positionString,
  flipBit,
  movePiece,
  getValidPiecesToMoveFromLegalMoveList,
  removeMoveThatCapturesKing,
} from './util';

const INITIAL_STATE: ChessState = {
  board: DEFAULT_BOARD,
  isCheck: false,
  legalMoves: [],
  validPiecesToMove: [],
  lastRejectedMove: null,
  nodesExplored: null,
  turnsElapsed: 0,
};

//TODO check for check on moveAttempted
//TODO check for castle when king moves >1 space

export default createSlice({
  name: 'chess',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        board: action.payload,
      };
    },
    moveAttempted: (state, action: PayloadAction<MoveAttemptedPayload>) => {
      if (state.legalMoves.includes(positionString(
        action.payload.from, action.payload.to
      ))) {
        return {
          ...state,
          board: flipBit(
            movePiece(
              state.board,
              action.payload.from,
              action.payload.to
            ),
            CONSTANTS.CURRENT_TURN_BLACK_BIT
          ),
          lastRejectedMove: null,
          legalMoves: [],
          validPiecesToMove: [],
          isCheck: false,
          turnsElapsed: state.turnsElapsed + 1,
        };
      } else {
        return {
          ...state,
          lastRejectedMove: positionString(
            action.payload.from,
            action.payload.to,
          )
        };
      }
    },
    moveReceived: (state, action: PayloadAction<ChessResponse>) => {
      const { isCheck, bestMove, nodesExplored } = action.payload;
      const [from, to] = bestMove.split('-').map(Number);

      return {
        ...state,
        isCheck,
        nodesExplored,
        lastRejectedMove: null,
        board: flipBit(
          movePiece(
            state.board,
            from,
            to,
          ),
          CONSTANTS.CURRENT_TURN_BLACK_BIT
        ),
      };
    },
    legalMovesReceived: (state, action: PayloadAction<ChessResponse>) => {
      if (state.turnsElapsed === 0) {
        const legalMovesWithoutKingCapture = removeMoveThatCapturesKing(
          action.payload.legalMoves,
          state.board,
        );
        return {
          ...state,
          isCheck: action.payload.isCheck,
          legalMoves: legalMovesWithoutKingCapture,
          validPiecesToMove: getValidPiecesToMoveFromLegalMoveList(
            legalMovesWithoutKingCapture,
          ),
        };
      }
      return {
        ...state,
        isCheck: action.payload.isCheck,
        legalMoves: action.payload.legalMoves,
        validPiecesToMove: getValidPiecesToMoveFromLegalMoveList(
          action.payload.legalMoves,
        ),
      };
    },
  },
  extraReducers: {

  },
});

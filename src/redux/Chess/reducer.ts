import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChessState,
  MoveAttemptedPayload,
  ChessResponse,
} from './types';
import {
  positionString,
  getValidPiecesToMoveFromLegalMoveList,
  removeMoveThatCapturesKing,
} from './util';
import { makeMove } from '../../engine/board';
import { DEFAULT_BOARD } from '../../engine/constants';

const INITIAL_STATE: ChessState = {
  board: DEFAULT_BOARD,
  isCheck: false,
  legalMoves: [],
  validPiecesToMove: [],
  lastRejectedMove: null,
  nodesExplored: null,
  turnsElapsed: 0,
  lastCapturedPiece: [null, null],
};

//TODO check for check on moveAttempted
//TODO check for castle when king moves >1 space
//TODO Update board meta information, such as king moving for first time
//TODO handle pawn promotion, make sure AI considers pawn promotion

export default createSlice({
  name: 'chess',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        turnsElapsed: 0,
        board: action.payload,
      };
    },
    moveAttempted: (state, action: PayloadAction<MoveAttemptedPayload>) => {
      if (state.legalMoves.includes(positionString(
        action.payload.from, action.payload.to
      ))) {
        return {
          ...state,
          board: makeMove(
            state.board,
            action.payload.from,
            action.payload.to
          ),
          lastRejectedMove: null,
          legalMoves: [],
          validPiecesToMove: [],
          isCheck: false,
          turnsElapsed: state.turnsElapsed + 1,
          lastCapturedPiece: [action.payload.to, state.board[action.payload.to]],
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
      const { isCheck, bestMove, nodesExplored, legalMoves } = action.payload;

      if (isCheck && legalMoves.length === 0) {
        return {
          ...state,
          isCheck,
          nodesExplored,
          legalMoves,
          lastRejectedMove: null,
        };
      }

      const [from, to] = bestMove.split('-').map(Number);

      return {
        ...state,
        isCheck,
        nodesExplored,
        lastRejectedMove: null,
        board: makeMove(
          state.board,
          from,
          to
        ),
        lastCapturedPiece: [to, state.board[to]],
      };
    },
    specialBoardCreated: (state, action: PayloadAction<string>) => {
      state.board = action.payload;
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

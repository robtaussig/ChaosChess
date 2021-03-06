import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChessState,
  MakeMovePayload,
} from './types';
import {
  getValidPiecesToMoveFromLegalMoveList,
} from './util';
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

//TODO check for castle when king moves >1 space
//TODO Update board meta information, such as king moving for first time
//TODO handle pawn promotion, make sure AI considers pawn promotion

export default createSlice({
  name: 'chess',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<{
      board: string,
      legalMoves: string[],
      isCheck: boolean,
    }>) => {
      return {
        ...state,
        turnsElapsed: 0,
        isCheck: action.payload.isCheck,
        board: action.payload.board,
        legalMoves: action.payload.legalMoves,
        lastCapturedPiece: [null, null],
      };
    },
    moveCompleted: (state, action: PayloadAction<MakeMovePayload>) => {
      return {
        ...state,
        board: action.payload.board,
        isCheck: action.payload.isCheck,
        lastRejectedMove: null,
        legalMoves: action.payload.legalMoves,
        validPiecesToMove: getValidPiecesToMoveFromLegalMoveList(
          action.payload.legalMoves
        ),
        turnsElapsed: state.turnsElapsed + 1,
        lastCapturedPiece: [action.payload.to, state.board[action.payload.to]],
      };
    },
    specialBoardCreated: (state, action: PayloadAction<string>) => {
      state.board = action.payload;
    },
    gameSynced: (state, action: PayloadAction<ChessState>) => {
      return action.payload;
    },
  },
  extraReducers: {

  },
});

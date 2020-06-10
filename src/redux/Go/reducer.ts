import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    GoState,
    MakeMovePayload,
    GameOverPayload,
    GameInitializedPayload,
    JoinRoomPayload,
} from './types';
import { INITIAL_BOARD_SMALL, INITIAL_BOARD_LARGE, INITIAL_BOARD_MEDIUM } from '../../goEngine/constants';

const INITIAL_STATE: GoState = {
  board: INITIAL_BOARD_MEDIUM,
  initialBoard: INITIAL_BOARD_MEDIUM,
  legalMoves: [],
  lastRejectedMove: null,
  turnsElapsed: 0,
  lastMove: null,
  history: [INITIAL_BOARD_MEDIUM],
  zones: {},
  winner: null,
  points: null,
  goRoom: null,
  goId: null,
};

export default createSlice({
  name: 'go',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<GameInitializedPayload>) => {
        return {
            ...state,
            ...action.payload,
            turnsElapsed: 0,
            lastRejectedMove: null,
            winner: null,
            points: null,
            zones: {},
            history: [action.payload.board],
            lastMove: null,
        };
    },
    moveCompleted: (state, action: PayloadAction<MakeMovePayload>) => {
      return {
        ...state,
        board: action.payload.board,
        legalMoves: action.payload.legalMoves,
        lastRejectedMove: null,
        turnsElapsed: state.turnsElapsed + 1,
        lastMove: action.payload.move,
        history: state.history.concat(action.payload.board),
      };
    },
    gameOver: (state, action: PayloadAction<GameOverPayload>) => {
      return {
        ...state,
        legalMoves: [],
        lastRejectedMove: null,
        winner: action.payload.winner,
        zones: action.payload.zones,
        points: action.payload.points,
      };
    },
    moveUndone: (state, action: PayloadAction<MakeMovePayload>) => {
      return {
        ...state,
        board: action.payload.board,
        legalMoves: action.payload.legalMoves,
        lastRejectedMove: null,
        turnsElapsed: state.turnsElapsed - 1,
        lastMove: action.payload.move,
        history: state.history.slice(0, state.history.length - 1),
      };
    },
    roomJoined: (state, action: PayloadAction<JoinRoomPayload>) => {
      state.goRoom = action.payload.room;
      state.goId = action.payload.uuid;
    },
  },
  extraReducers: {

  },
});

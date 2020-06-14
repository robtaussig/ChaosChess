import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    GoState,
    MakeMovePayload,
    GameOverPayload,
    GameInitializedPayload,
    JoinRoomPayload,
    LeaveRoomPayload,
} from './types';
import { INITIAL_BOARD_SMALL, INITIAL_BOARD_LARGE, INITIAL_BOARD_MEDIUM } from '../../goEngine/constants';
import { Color } from '../../goEngine/types';

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
  userColor: Color.None,
  opponent: null,
};

export default createSlice({
  name: 'go',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<GameInitializedPayload>) => {
        return {
            ...state,
            ...action.payload,
            initialBoard: action.payload.board,
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
    },
    roomLeft: (state, action: PayloadAction<LeaveRoomPayload>) => {
      state.goRoom = null;
    },
    colorClaimed: (state, action: PayloadAction<Color>) => {
      state.userColor = action.payload;
    },
    opponentNamed: (state, action: PayloadAction<string>) => {
      state.opponent = action.payload;
    },
    goIdClaimed: (state, action: PayloadAction<string>) => {
      state.goId = action.payload;
    },
    setBoard: (state, action: PayloadAction<string>) => {
      state.board = action.payload;
    },
  },
  extraReducers: {

  },
});

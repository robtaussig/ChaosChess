import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpponentState, OpponentType } from './types';
import { roomCreated, joinToRequestAccepted, RoomCreatedPayload, joinRequested } from '../Connection';
import {
  setUpVsAI,
  setUpVsHuman,
} from '../Game';
import { returnHome } from '../App';

const INITIAL_STATE: OpponentState = {
  type: OpponentType.AI,
  uuid: null,
  isReady: false,
};

export default createSlice({
  name: 'opponent',
  initialState: INITIAL_STATE,
  reducers: {
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    syncOpponentStateWithGuest: (state, action: PayloadAction<Partial<OpponentState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [setUpVsAI.type]: state => {
      state.type = OpponentType.AI;
      state.isReady = true;
    },
    [setUpVsHuman.type]: state => {
      state.type = OpponentType.Human;
      state.isReady = false;
    },
    [roomCreated.type]: (state, action: PayloadAction<RoomCreatedPayload>) => {
      state.uuid = action.payload.opponent;
    },
    [joinToRequestAccepted.type]: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
    [returnHome.type]: () => {
      return INITIAL_STATE;
    },
    [joinRequested.type]: state => {
      state.type = OpponentType.Human;
    },
  },
});

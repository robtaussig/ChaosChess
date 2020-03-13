import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpponentState, OpponentType } from './types';
import {
  setUpVsAI,
  setUpVsHuman,
} from '../Game';

const INITIAL_STATE: OpponentState = {
  type: OpponentType.AI,
  uuid: null,
  isReady: false,
};

export default createSlice({
  name: 'opponent',
  initialState: INITIAL_STATE,
  reducers: {

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
  },
});

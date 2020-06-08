import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    GoState,
} from './types';
import { INITIAL_BOARD } from '../../goEngine/constants';

const INITIAL_STATE: GoState = {
  board: INITIAL_BOARD,
  legalMoves: [],
  lastRejectedMove: null,
  turnsElapsed: 0,
};

export default createSlice({
  name: 'go',
  initialState: INITIAL_STATE,
  reducers: {
    gameInitialized: (state, action: PayloadAction<{ board: string, legalMoves: number[]}>) => {
        return {
            ...state,
            ...action.payload,
            turnsElapsed: 0,
            lastRejectedMove: null,
        };
    },
  },
  extraReducers: {

  },
});

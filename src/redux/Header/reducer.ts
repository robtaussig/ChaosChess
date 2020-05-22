import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderText } from './types';
import { gameStarted } from '../Game';

const INITIAL_STATE: string = HeaderText.ChaosChess;

export default createSlice({
  name: 'header',
  initialState: INITIAL_STATE,
  reducers: {
    setHeader: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
  extraReducers: {
    [gameStarted.type]: (_state, action) => {
      return `vs ${action.payload.opponent}`;
    },
  },
});

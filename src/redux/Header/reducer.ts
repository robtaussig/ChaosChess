import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderText } from './types';
import { gameStarted } from '../Game';
import { settingsOpened } from '../Settings';

const INITIAL_STATE: HeaderText = HeaderText.ChaosChess;

export default createSlice({
  name: 'header',
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: {
    [gameStarted.type]: (_state, action) => {
      return `vs ${action.payload.opponent}` as any;
    },
    [settingsOpened.type]: () => {
      return HeaderText.Settings;
    },
  },
});

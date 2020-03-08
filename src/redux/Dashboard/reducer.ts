import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardTypes, DashboardState } from './types';
import { gameStarted } from '../Game';
import { settingsOpened } from '../Settings';

const INITIAL_STATE: DashboardState = {
  type: DashboardTypes.MainScreen,
};

export default createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: {
    [gameStarted.type]: (state) => {
      state.type = DashboardTypes.InGame;
    },
    [settingsOpened.type]: (state) => {
      state.type = DashboardTypes.Settings;
    },
  },
});

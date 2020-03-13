import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardTypes, DashboardState } from './types';
import {
  gameStarted,
  setUpVsAI,
  setUpVsHuman,
} from '../Game';
import { settingsOpened } from '../Settings';
import {
  roomCreated,
  joinToRequestAccepted,
} from '../Connection';
import { returnHome } from '../App';

const INITIAL_STATE: DashboardState = {
  type: DashboardTypes.MainScreen,
};

export default createSlice({
  name: 'dashboard',
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: {
    [gameStarted.type]: state => {
      state.type = DashboardTypes.InGame;
    },
    [settingsOpened.type]: state => {
      state.type = DashboardTypes.Settings;
    },
    [returnHome.type]: state => {
      state.type = DashboardTypes.MainScreen;
    },
    [setUpVsAI.type]: state => {
      state.type = DashboardTypes.SetUpOpponent;
    },
    [setUpVsHuman.type]: state => {
      state.type = DashboardTypes.SetUpOpponent;
    },
    [joinToRequestAccepted.type]: state => {
      state.type = DashboardTypes.MultiplayerDashboard;
    },
    [roomCreated.type]: state => {
      state.type = DashboardTypes.MultiplayerDashboard;
    },
  },
});

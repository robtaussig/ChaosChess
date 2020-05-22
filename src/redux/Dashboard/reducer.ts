import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardTypes, DashboardState } from './types';
import {
  gameStarted,
} from '../Game';
import {
  roomCreated,
  joinToRequestAccepted,
} from '../Connection';

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
    [joinToRequestAccepted.type]: state => {
      state.type = DashboardTypes.MultiplayerDashboard;
    },
    [roomCreated.type]: state => {
      state.type = DashboardTypes.MultiplayerDashboard;
    },
  },
});

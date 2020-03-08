import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderText } from './types';
import { gameStarted, setUpVsAI, setUpVsHuman } from '../Game';
import { settingsOpened } from '../Settings';
import { returnHome } from '../App';

const INITIAL_STATE: string = HeaderText.ChaosChess;

export default createSlice({
  name: 'header',
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: {
    [setUpVsAI.type]: (_state) => {
      return 'Rules';
    },
    [setUpVsHuman.type]: (_state) => {
      return 'Find Opponent';
    },
    [gameStarted.type]: (_state, action) => {
      return `vs ${action.payload.opponent}`;
    },
    [settingsOpened.type]: () => {
      return HeaderText.Settings;
    },
    [returnHome.type]: () => {
      return HeaderText.ChaosChess;
    },
  },
});

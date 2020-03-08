import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameStages,
  GameState,
  GameTypes,
  GameStartedPayload,
} from './types';
import { returnHome } from '../App';

const INITIAL_STATE: GameState = {
  stage: GameStages.NotStarted,
  type: GameTypes.Chaos,
  difficulty: 5,
};

export default createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setUpVsAI: state => {
      state.stage = GameStages.SettingUpAI;
    },
    setUpVsHuman: state => {
      state.stage = GameStages.SettingUpHuman;
    },
    gameStarted: (state, action: PayloadAction<GameStartedPayload>) => {
      state.stage = GameStages.Started;
    },
    gameTypeSelected: (state, action: PayloadAction<GameTypes>) => {
      state.type = action.payload;
    },
    difficultyChanged: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
  },
  extraReducers: {
    [returnHome.type]: state => {
      state.stage = GameStages.NotStarted;
    },
  },
});

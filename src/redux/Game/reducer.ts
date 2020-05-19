import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameStages,
  GameState,
  GameTypes,
  GameStartedPayload,
  ChaosGameTypes,
} from './types';
import { returnHome } from '../App';
import { gameInitialized } from '../Chess';
import { privateRoomJoined } from '../Connection';

const INITIAL_STATE: GameState = {
  stage: GameStages.NotStarted,
  type: GameTypes.Chaos,
  subType: ChaosGameTypes.Normal,
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
      if (action.payload === GameTypes.Regular) {
        state.subType = ChaosGameTypes.None;
      } else if (action.payload === GameTypes.Chaos) {
        state.subType = ChaosGameTypes.Normal;
      }
    },
    subGameTypeSelected: (state, action: PayloadAction<ChaosGameTypes>) => {
      state.subType = action.payload;
    },
    difficultyChanged: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
    syncGameStateWithHost: (state, action: PayloadAction<Partial<GameState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [returnHome.type]: state => {
      state.stage = GameStages.NotStarted;
    },
    [gameInitialized.type]: state => {
      state.stage = GameStages.InProgress;
    },
    [privateRoomJoined.type]: state => {
      state.stage = GameStages.SettingUpHuman;
    },
  },
});

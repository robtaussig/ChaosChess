import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStages, GameState, GameStartedPayload } from './types';

const INITIAL_STATE: GameState = {
  stage: GameStages.NotStarted
};

export default createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    gameStarted (state, action: PayloadAction<GameStartedPayload>) {
      state.stage = GameStages.Started;
    },
  },
});

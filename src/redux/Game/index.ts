import { RootState } from '../types';
import gameReducer from './reducer';

export const {
  gameStarted,
  setUpVsAI,
  setUpVsHuman,
  gameTypeSelected,
  difficultyChanged,
} = gameReducer.actions;

export const reducer = gameReducer.reducer;

export const gameSelector = (state: RootState) => state.game;

export {
  GameStages,
  GameState,
  GameStartedPayload,
  GameTypes,
} from './types';

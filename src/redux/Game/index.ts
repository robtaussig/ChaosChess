import { RootState } from '../types';
import gameReducer from './reducer';

export const {
  gameStarted,
  setUpVsAI,
  setUpVsHuman,
  gameTypeSelected,
  difficultyChanged,
  subGameTypeSelected,
  syncGameStateWithHost,
} = gameReducer.actions;

export const reducer = gameReducer.reducer;

export const gameSelector = (state: RootState) => state.game;

export {
  GameStages,
  GameState,
  GameStartedPayload,
  GameTypes,
  ChaosGameTypes,
  BoardTypes,
} from './types';

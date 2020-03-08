import { RootState } from '../types';
import gameReducer from './reducer';

export const {
  gameStarted,
} = gameReducer.actions;

export const reducer = gameReducer.reducer;

export const gameSelector = (state: RootState) => state.game;

export {
  GameStages,
  GameState,
  GameStartedPayload,
} from './types';

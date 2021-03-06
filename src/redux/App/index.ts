import appReducer from './reducer';
import { RootState } from '../types';

export const {
  returnHome,
  setBoardFocus,
} = appReducer.actions;

export const reducer = appReducer.reducer;

export const appSelector = (state: RootState) => state.app;

export { AppState } from './types';

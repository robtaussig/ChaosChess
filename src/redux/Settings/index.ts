import settingsReducer from './reducer';
import { RootState } from '../types';

export const {
  settingsOpened,
} = settingsReducer.actions;

export const reducer = settingsReducer.reducer;

export const settingsSelector = (state: RootState) => state.settings;

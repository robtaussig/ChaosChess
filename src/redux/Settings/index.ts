import settingsReducer from './reducer';
import { RootState } from '../types';

export const {
  settingsOpened,
  typeSelected,
  settingsUpdated,
} = settingsReducer.actions;

export const reducer = settingsReducer.reducer;

export { SettingsType, DifficultyType } from './types';

export const settingsSelector = (state: RootState) => state.settings;

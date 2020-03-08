import settingsReducer from './reducer';
import { RootState } from '../types';

export const {
  settingsOpened,
  typeSelected,
} = settingsReducer.actions;

export const reducer = settingsReducer.reducer;

export { SettingsType } from './types';

export const settingsSelector = (state: RootState) => state.settings;

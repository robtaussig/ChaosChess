import helpReducer from './reducer';
import { RootState } from '../types';

export const {
  openHelp,
} = helpReducer.actions;

export const reducer = helpReducer.reducer;

export const helpSelector = (state: RootState) => state.help;

export { HelpState, HelpTypes } from './types';

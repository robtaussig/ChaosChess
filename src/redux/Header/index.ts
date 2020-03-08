import { RootState } from '../types';
import headerReducer from './reducer';

export const {

} = headerReducer.actions;

export const reducer = headerReducer.reducer;

export const headerSelector = (state: RootState) => state.header;

export { HeaderText } from './types';

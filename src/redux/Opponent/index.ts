import { RootState } from '../types';
import opponentReducer from './reducer';

export const {

} = opponentReducer.actions;

export const reducer = opponentReducer.reducer;

export const opponentSelector = (state: RootState) => state.opponent;

export { OpponentState, OpponentType } from './types';

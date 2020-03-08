import { RootState } from '../types';
import userReducer from './reducer';

export const {

} = userReducer.actions;

export const reducer = userReducer.reducer;

export const userSelector = (state: RootState) => state.user;

export { Avatar, UserState } from './types';

import { combineReducers } from '@reduxjs/toolkit';
import { reducer as app } from './App/reducer';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

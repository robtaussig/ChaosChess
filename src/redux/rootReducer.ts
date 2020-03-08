import { combineReducers } from '@reduxjs/toolkit';
import { reducer as app } from './App';
import { reducer as dashboard } from './Dashboard';
import { reducer as game } from './Game';
import { reducer as settings } from './Settings';
import { reducer as header } from './Header';

const rootReducer = combineReducers({
  app,
  dashboard,
  game,
  settings,
  header,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import { reducer as app } from './App';
import { reducer as dashboard } from './Dashboard';
import { reducer as game } from './Game';
import { reducer as settings } from './Settings';
import { reducer as header } from './Header';
import { reducer as user } from './User';
import { reducer as opponent } from './Opponent';
import { reducer as chess } from './Chess';
import { reducer as connection } from './Connection';

const rootReducer = combineReducers({
  app,
  dashboard,
  game,
  settings,
  header,
  user,
  opponent,
  chess,
  connection,
});

export default rootReducer;

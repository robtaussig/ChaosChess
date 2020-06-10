import { configureStore, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { goMiddleware, } from './Go/middleware';

const [thunkMiddleware, ...defaultMiddleware] = getDefaultMiddleware();
const middleware = [thunkMiddleware, goMiddleware, ...defaultMiddleware, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

import dashboardReducer from './reducer';
import { RootState } from '../types';

export const {
  
} = dashboardReducer.actions;

export const reducer = dashboardReducer.reducer;

export const dashboardSelector = (state: RootState) => state.dashboard;

export { DashboardState, DashboardTypes } from './types';

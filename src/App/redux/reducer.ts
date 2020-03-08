import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/rootReducer';

const app = createSlice({
  name: 'app',
  initialState: 0 as number,
  reducers: {
    actionType: state => state + 1,
  },
});

export const {
  actionType,
} = app.actions;

export const reducer = app.reducer;

export const appSelector = (state: RootState) => state.app;

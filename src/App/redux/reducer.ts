import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/rootReducer';

export interface appState {
  userName: string;
}

const INITIAL_STATE: appState = {
  userName: '',
};

const app = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    nameSubmitted: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const {
  nameSubmitted,
} = app.actions;

export const reducer = app.reducer;

//@ts-ignore
export const appSelector = (state: RootState) => state.app;

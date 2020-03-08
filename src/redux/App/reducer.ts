import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const INITIAL_STATE: AppState = {
  userName: '',
};

export default createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    nameSubmitted(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const INITIAL_STATE: AppState = {
  focusBoard: false,
};

export default createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    returnHome: () => {
      location.href = '/';
      return INITIAL_STATE;
    },
    setBoardFocus: (state, action: PayloadAction<boolean>) => {
      state.focusBoard = action.payload;
    },
  },
});

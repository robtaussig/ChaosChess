import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpState, HelpTypes } from './types';

const INITIAL_STATE: HelpState = {
  currentPage: null,
};

export default createSlice({
  name: 'help',
  initialState: INITIAL_STATE,
  reducers: {
    openHelp: (state, action: PayloadAction<HelpTypes>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {

  },
});

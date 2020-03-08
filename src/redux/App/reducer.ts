import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const INITIAL_STATE: AppState = {

};

export default createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    returnHome: () => null,
  },
});

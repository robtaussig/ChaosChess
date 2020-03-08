import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  isOpen: boolean;
}

const INITIAL_STATE: SettingsState = {
  isOpen: false,
};

export default createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    settingsOpened (state) {
      state.isOpen = true;
    },
  },
});

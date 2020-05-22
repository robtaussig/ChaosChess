import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, SettingsType, DifficultyType } from './types';

const INITIAL_STATE: SettingsState = {
  type: SettingsType.User,
  difficulty: DifficultyType.Intermediate,
  useMoveHistory: true,
  preferredGameMode: '',
};

export default createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    typeSelected: (state, action: PayloadAction<SettingsType>) => {
      state.type = action.payload;
    },
    settingsUpdated: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
  extraReducers: {

  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { returnHome } from '../App';
import { SettingsState, SettingsType, DifficultyType } from './types';

const INITIAL_STATE: SettingsState = {
  isOpen: false,
  type: SettingsType.User,
  difficulty: DifficultyType.Intermediate,
  useMoveHistory: true,
  preferredGameMode: '',
};

export default createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    settingsOpened: state => {
      state.isOpen = true;
    },
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
    [returnHome.type]: state => {
      state.isOpen = false;
    },
  },
});

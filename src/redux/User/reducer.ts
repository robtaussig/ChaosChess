import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar, UserState } from './types';
import { Color } from '../../engine/types';
import { gameStarted, GameStartedPayload } from '../Game';

const INITIAL_STATE: UserState = {
  avatar: Avatar.Bot,
  name: '',
  color: Color.White,
};

export default createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    userUpdated: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [gameStarted.type]: (state, action: PayloadAction<GameStartedPayload>) => {
      state.color = action.payload.isWhite ? Color.White : Color.Black;
    },
  },
});

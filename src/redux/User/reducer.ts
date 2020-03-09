import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar, UserState, Color } from './types';

const INITIAL_STATE: UserState = {
  avatar: Avatar.Bot,
  name: '?',
  color: Color.White,
};

export default createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    avatarPicked: (state, action: PayloadAction<Avatar>) => {
      state.avatar = action.payload;
    },
    nameEntered: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: {

  },
});

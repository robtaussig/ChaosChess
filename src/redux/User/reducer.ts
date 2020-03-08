import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar, UserState } from './types';

const INITIAL_STATE: UserState = {
  avatar: Avatar.Bot,
  name: '?',
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

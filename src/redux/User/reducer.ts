import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar, UserState } from './types';
import { Color } from '../../engine/types';

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

  },
});

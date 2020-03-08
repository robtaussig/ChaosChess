import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/rootReducer';

const reducerName = createSlice({
  name: 'reducerName',
  initialState: 0 as number,
  reducers: {
    actionType: state => state + 1,
  },
});

export const {
  actionType,
} = reducerName.actions;

export const reducer = reducerName.reducer;

//@ts-ignore
export const reducerNameSelector = (state: RootState) => state.reducerName;

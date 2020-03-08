import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/rootReducer';

export interface ReducerNameState {
  name: string;
}

const INITIAL_STATE: ReducerNameState = {
  name: 'Rob',
};

const reducerName = createSlice({
  name: 'reducerName',
  initialState: INITIAL_STATE,
  reducers: {
    actionType: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {
  actionType,
} = reducerName.actions;

export const reducer = reducerName.reducer;

//@ts-ignore
export const reducerNameSelector = (state: RootState) => state.reducerName;

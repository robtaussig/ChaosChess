import rootReducer from './rootReducer';
import { Action } from 'redux';
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<T> = (
  dispatch: <S>(action: Action | AppThunk<S>) => S,
  getState: () => RootState
) => T;

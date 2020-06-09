import { RootState } from '../types';
import goReducer from './reducer';

export const {
    gameInitialized,
    moveCompleted,
    gameOver,
    moveUndone,
} = goReducer.actions;

export const reducer = goReducer.reducer;

export const goSelector = (state: RootState) => state.go;

export {

} from './types';

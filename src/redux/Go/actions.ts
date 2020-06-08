import { WorkerInterface } from '../../goEngine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { makeMove } from '../../goEngine/board';
import { gameInitialized } from './';
import { SendMessage } from '../../hooks/useSocket';
import { MessageTypes } from '../../redux/Connection';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../goEngine/engine.worker.ts')
);

export const startGame = (
    board?: string,
  ): AppThunk<void> =>
    async (dispatch, getState) => {
      const availableMoves = await engineWorker.getValidMoves(board);
  
      dispatch(gameInitialized({
        board,
        legalMoves: availableMoves,
      }));
    };

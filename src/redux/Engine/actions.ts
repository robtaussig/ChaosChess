import { WorkerInterface } from '../../engine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { BaseGame } from '../../games';
import { makeMove } from '../../engine/board';
import { isCheck } from '../../engine/';
import { gameInitialized, moveCompleted } from '../Chess';
export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../engine/engine.worker.ts')
);

export const startGame = (
  game: BaseGame,
): AppThunk<void> =>
  async (dispatch, getState) => {
    const initialBoard = await game.generateInitialBoard();
    const availableMoves = await engineWorker.getValidMoves(initialBoard);

    dispatch(gameInitialized({
      board: initialBoard,
      legalMoves: game.filterLegalMoves(availableMoves.legalMoves, initialBoard),
      isCheck: isCheck(initialBoard),
    }));
  };

export const processMove = (
  from: number,
  to: number,
  game: BaseGame,
): AppThunk<void> =>
  async (dispatch, getState) => {
    const { chess } = getState();
    const { board } = chess;
  
    const nextBoard = game.moveMade(
      makeMove(board, from, to)
    );
    dispatch(moveCompleted({
      from,
      to,
      board: nextBoard,
      isCheck: isCheck(nextBoard),
      legalMoves: null,
    }));

    const [, move] = await engineWorker.getBestMove(
      nextBoard,
      game.engineDifficulty,
    );
    const [fromResponse, fromTo] = move.split('-').map(Number);
    const followupBoard = game.moveMade(
      makeMove(nextBoard, fromResponse, fromTo)
    );

    const availableMoves = await engineWorker.getValidMoves(followupBoard);

    dispatch(moveCompleted({
      from: fromResponse,
      to: fromTo,
      board: followupBoard,
      isCheck: isCheck(followupBoard),
      legalMoves: availableMoves.legalMoves,
    }));
  };

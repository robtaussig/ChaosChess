import { WorkerInterface } from '../../engine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { BaseGame } from '../../games';
import { makeMove } from '../../engine/board';
import { isCheck } from '../../engine/';
import { gameInitialized, moveCompleted, MakeMovePayload, ChessState, gameSynced } from '../Chess';
import { SendMessage } from '../../hooks/useSocket';
import { MessageTypes } from '../../redux/Connection';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../engine/engine.worker.ts')
);

export const startGame = (
  game: BaseGame,
  board?: string,
): AppThunk<void> =>
  async (dispatch, getState) => {
    const initialBoard = board ?? await game.generateInitialBoard();
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
    //move is undefined if no legal moves
    const [fromResponse, fromTo] = move?.split('-').map(Number) ?? [];
    const followupBoard = fromTo ? game.moveMade(
      makeMove(nextBoard, fromResponse, fromTo)
    ) : nextBoard;

    const availableMoves = await engineWorker.getValidMoves(followupBoard);

    dispatch(moveCompleted({
      from: fromResponse,
      to: fromTo,
      board: followupBoard,
      isCheck: isCheck(followupBoard),
      legalMoves: availableMoves.legalMoves,
    }));
  };

export const makeMoveAndUpdateOpponent = (
  from: number,
  to: number,
  game: BaseGame,
  sendMessage: SendMessage,
): AppThunk<void> =>
  async (dispatch, getState) => {
    const { chess } = getState();
    const { board } = chess;
  
    const nextBoard = game.moveMade(
      makeMove(board, from, to)
    );

    const checked = isCheck(nextBoard);
  
    dispatch(moveCompleted({
      from,
      to,
      board: nextBoard,
      isCheck: checked,
      legalMoves: null,
    }));

    const availableMoves = await engineWorker.getValidMoves(nextBoard);

    const payload: MakeMovePayload = {
      from,
      to,
      board: nextBoard,
      isCheck: availableMoves.isCheck,
      legalMoves: availableMoves.legalMoves,
    };

    sendMessage(`${MessageTypes.MakeMove}||${JSON.stringify(payload)}`);
  };

export const syncronizeBoard = (chessState: ChessState): AppThunk<void> =>
  async (dispatch, getState) => {
    const availableMoves = await engineWorker.getValidMoves(chessState.board);
    dispatch(gameSynced({
      ...chessState,
      isCheck: availableMoves.isCheck,
      legalMoves: availableMoves.legalMoves,
    }))
  };

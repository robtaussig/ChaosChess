import { WorkerInterface, Piece, Color } from '../../goEngine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { makeMove, getWinner, toggleTurn, getNumSquares } from '../../goEngine/board';
import { gameInitialized, gameOver, moveUndone } from './';
import { SendMessage } from '../../hooks/useSocket';
import { MessageTypes } from '../../redux/Connection';
import { moveCompleted } from './';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../goEngine/engine.worker.ts')
);

export const startGame = (): AppThunk<void> =>
  async (dispatch, getState) => {
    const board = getState().go.initialBoard;
    const legalMoves = await engineWorker.getValidMoves(board);

    dispatch(gameInitialized({
      board,
      legalMoves,
    }));
  };

export const handlePlayerMove = (
  pos: number,
): AppThunk<void> =>
  async (dispatch, getState) => {
    const { go } = getState();
    const nextBoard = makeMove(go.board, pos);
    const legalMoves = await engineWorker.getValidMoves(nextBoard, go.history);

    dispatch(moveCompleted({
      board: nextBoard,
      move: pos,
      legalMoves,
    }));
  };

export const passTurn = (): AppThunk<void> =>
  async (dispatch, getState) => {
    const { go } = getState();
    if (go.lastMove === null) {
      const { whitePoints, blackPoints, zones } = getWinner(go.board);

      dispatch(gameOver({
        winner: whitePoints > blackPoints ? Color.White : blackPoints > whitePoints ? Color.Black : Color.None,
        points: { white: whitePoints, black: blackPoints },
        zones,
      }));
    } else {
      const nextBoard = makeMove(go.board, null);
      const legalMoves = await engineWorker.getValidMoves(nextBoard, go.history);
  
      dispatch(moveCompleted({
        board: nextBoard,
        move: null,
        legalMoves,
      }));
    }
  };

export const undo = (): AppThunk<void> =>
  async (dispatch, getState) => {
    const { go } = getState();
    const { history } = go;
    const lastBoard = history[history.length - 2];
    const legalMoves = await engineWorker.getValidMoves(lastBoard);
    const lastLastBoard = history[history.length - 3];
    let lastMove: number = null;
    if (lastLastBoard) {
      lastBoard.split('').forEach((square, idx) => {
        if (lastLastBoard[idx] === Piece.Empty && square !== Piece.Empty) {
          lastMove = idx;
        }
      });
    }

    dispatch(moveUndone({
      board: lastBoard,
      legalMoves,
      move: lastMove,
    }));
  };

import { WorkerInterface, Piece, Color } from '../../goEngine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { makeMove, getWinner } from '../../goEngine/board';
import { gameInitialized, gameOver } from './';
import { SendMessage } from '../../hooks/useSocket';
import { MessageTypes } from '../../redux/Connection';
import { moveCompleted } from './';
import { INITIAL_BOARD_MEDIUM } from '../../goEngine/constants';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../goEngine/engine.worker.ts')
);

export const startGame = (
  board?: string,
): AppThunk<void> =>
  async (dispatch, getState) => {
    board = board ?? getState().go.board;
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

export const resignGame = (): AppThunk<void> =>
  async (dispatch, getState) => {
    // const legalMoves = await engineWorker.getValidMoves(board);

    // dispatch(gameInitialized({
    //   board,
    //   legalMoves,
    // }));
  };

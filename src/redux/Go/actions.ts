import { WorkerInterface, Piece, Color } from '../../goEngine/types';
import { wrap } from 'comlink';
import { AppThunk } from '../types';
import { makeMove, getWinner } from '../../goEngine/board';
import { INITIAL_BOARD_SMALL, INITIAL_BOARD_MEDIUM, INITIAL_BOARD_LARGE } from '../../goEngine/constants';
import { gameInitialized, gameOver, moveUndone, roomJoined } from './';
import { SendMessage } from '../../hooks/useSocket';
import { moveCompleted } from './';
import { joinRoom } from '../../messaging';
import { v4 as uuidv4 } from 'uuid';

export const engineWorker = wrap<WorkerInterface>(
  new Worker('../../goEngine/engine.worker.ts')
);

export const startGame = (broadcast: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    const board = getState().go.initialBoard;
    const legalMoves = await engineWorker.getValidMoves(board);

    dispatch(gameInitialized({
      board,
      legalMoves,
      broadcast,
    }));
  };

export const handlePlayerMove = (
  broadcast: SendMessage,
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
      broadcast,
    }));
  };

export const passTurn = (broadcast: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    const { go } = getState();
    if (go.lastMove === null) {
      const { whitePoints, blackPoints, zones } = getWinner(go.board);

      dispatch(gameOver({
        winner: whitePoints > blackPoints ? Color.White : blackPoints > whitePoints ? Color.Black : Color.None,
        points: { white: whitePoints, black: blackPoints },
        zones,
        broadcast,
      }));
    } else {
      const nextBoard = makeMove(go.board, null);
      const legalMoves = await engineWorker.getValidMoves(nextBoard, go.history);
  
      dispatch(moveCompleted({
        board: nextBoard,
        move: null,
        legalMoves,
        broadcast,
      }));
    }
  };

export const undo = (broadcast: SendMessage): AppThunk<void> =>
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
      broadcast,
    }));
  };

export const boardSizeChanged = (broadcast: SendMessage, size: '9x9' | '13x13' | '19x19'): AppThunk<void> =>
  async (dispatch, getState) => {
    const board = size === '9x9' ?
      INITIAL_BOARD_SMALL :
      size === '13x13' ?
      INITIAL_BOARD_MEDIUM :
        INITIAL_BOARD_LARGE;
    const legalMoves = await engineWorker.getValidMoves(board);

    dispatch(gameInitialized({
      board,
      legalMoves,
      broadcast,
    }));
  };

export const joinGoRoom = (broadcast: SendMessage, room: string): AppThunk<void> =>
  async (dispatch, getState) => {
    const uuid = uuidv4();
    joinRoom(uuid, room, broadcast);
    dispatch(roomJoined({
      room, uuid,
    }));
  };

import { expose } from 'comlink';
import {
  Board,
  Move,
  WorkerInterface,
} from './types';
import {
  DEFAULT_BOARD
} from './constants';
import {
  findLegalMoves,
  isCheck,
} from './';
import {
  getBestMove as getBestMoveEval,
} from './eval';

const getValidMoves = (board: Board = DEFAULT_BOARD) => {
  return {
    legalMoves: findLegalMoves(board),
    isCheck: isCheck(board),
  };
};

const getBestMove = (board: Board, depth = 4): [number, Move] => {
  return getBestMoveEval(board, depth);
};

expose({
  getValidMoves,
  getBestMove,
} as WorkerInterface);

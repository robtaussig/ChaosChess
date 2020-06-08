import { expose } from 'comlink';
import {
  WorkerInterface,
} from './types';
import {
  INITIAL_BOARD
} from './constants';
import {
  findLegalMoves,
} from './';
import {
  getBestMove as getBestMoveEval,
} from './eval';

const getValidMoves = (board = INITIAL_BOARD) => {
  return findLegalMoves(board);
};

const getBestMove = (
  board: string,
  depth = 4,
): [number, number] => {
  return getBestMoveEval(board, depth);
};

expose({
  getValidMoves,
  getBestMove,
} as WorkerInterface);

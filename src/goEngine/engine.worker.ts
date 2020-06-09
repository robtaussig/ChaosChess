import { expose } from 'comlink';
import {
  WorkerInterface,
} from './types';
import {
  INITIAL_BOARD_MEDIUM
} from './constants';
import {
  findLegalMoves,
} from './board';
import {
  getBestMove as getBestMoveEval,
} from './eval';

const getValidMoves = (board = INITIAL_BOARD_MEDIUM, history: string[] = []) => {
  return findLegalMoves(board, history);
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
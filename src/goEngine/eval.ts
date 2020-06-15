import {
  findLegalMoves,
  makeMove,
  getWinner,
  getCurrentTurnBit,
  filterIrrelevantSquaresAtRoot,
} from './board';
import { Color } from './types';

const snapshotEvaluation = (board: string): number => {
  const { whitePoints, blackPoints } = getWinner(board);
  const currentTurnBit = getCurrentTurnBit(board);
  const currentColor = board[currentTurnBit] === Color.Black ?
      Color.White :
      Color.Black;

  if (currentColor === Color.Black) return blackPoints - whitePoints;
  return whitePoints - blackPoints;
};

export const getBestMove = (
  board: string,
  history: string[] = [],
  depth: number = 4,
  isMaximizer: boolean = false,
  alpha = -Infinity,
  beta = Infinity,
  root = true,
  countNode?: () => void,
): [number, number] => {
  if (depth === 0) {
    const value = snapshotEvaluation(board);
    if (isMaximizer) {
      return [value, null];
    } else {
      return [-value, null];
    }
  }

  let bestMove = null;
  let bestMoveValue = isMaximizer ? -Infinity : Infinity;
  let value;

  /*
    Perhaps an anti-strategy, but only consider moves within a certain range of another stone, the theory
    being that all other squares are equally viable
  */
  const legalMoves = filterIrrelevantSquaresAtRoot(board, findLegalMoves(board, history));
  
  /*
    Sorts moves at first level by a single-level-deep evaluation. Searching through the best branches early on
    increases likelihood of pruning future branches
  */
  const moves = root ? legalMoves.sort((a, b) => {
    const posA = snapshotEvaluation(makeMove(board, a));
    const posB = snapshotEvaluation(makeMove(board, b));
    return posA === posB ? 1 - (Math.random() * 2) : posA - posB;
  }) : legalMoves;

  for (let i = 0; i < moves.length; i++) {
    const moveToTest = moves[i];
    const nextBoardRep = makeMove(board, moveToTest);
    value = getBestMove(nextBoardRep, [], depth - 1, !isMaximizer, alpha, beta, false, countNode)[0];
    if (countNode) countNode(); // Caller passes a callback that increments a counter. Can also be invoked in tests to evaluate efficiency.

    //Mini-max
    if (isMaximizer) {
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = moveToTest;
      }
      alpha = Math.max(alpha, value);
    } else {
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = moveToTest;
      }
      beta = Math.min(beta, value);
    }

    //Alpha-beta pruning. Amazing how simple it is.
    if (beta <= alpha) {
      break;
    }
  }

  return [bestMoveValue, bestMove || moves[0]];
};

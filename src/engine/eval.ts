import {
  Board,
  Move,
  Square,  
  Piece,
  CurrentColorBit,
  A8Square,
  H1Square,
} from './types';
import {
  WHITE_VALUE_MAP,
  BLACK_VALUE_MAP,
  BLACK_POSITIONAL_VALUE,
  WHITE_POSITIONAL_VALUE,
} from './values';
import {
  testMove,
} from './board';
import {
  assertBlack,
  assertWhite,
  isPiece,
} from './util';
import { findLegalMoves } from './';

export const getPositionalEvaluation = (
  piece: Piece,
  position: Square,
  isBlack: boolean,
) => {
  if (assertBlack(isBlack, piece) && BLACK_POSITIONAL_VALUE[piece]) {
    return BLACK_POSITIONAL_VALUE[piece][position];
  } else if (assertWhite(isBlack, piece) && WHITE_POSITIONAL_VALUE[piece]) {
    return WHITE_POSITIONAL_VALUE[piece][position];
  }
  
  return 0;
};

export const snapshotEvaluation = (board: Board) => {
  const isBlack = board[CurrentColorBit.position] === CurrentColorBit.Black;
  let blackMaterial = 0;
  let whiteMaterial = 0;
  let blackPositional = 0;
  let whitePositional = 0;
  for (let pos = A8Square; pos <= H1Square; pos++) {
    const piece = board[pos];
    if (isPiece(piece)) {
      blackMaterial += BLACK_VALUE_MAP[piece] || 0;
      whiteMaterial += WHITE_VALUE_MAP[piece] || 0;
      blackPositional += getPositionalEvaluation(piece, pos, true);
      whitePositional += getPositionalEvaluation(piece, pos, false);
    }
  }
  const materialDifference = isBlack ?
    blackMaterial - whiteMaterial :
    whiteMaterial - blackMaterial;

  const positionalDifference = isBlack ?
    blackPositional - whitePositional :
    whitePositional - blackPositional;

  return materialDifference + positionalDifference;
};

export const getBestMove = (
  board: Board,
  depth: number = 4,
  isMaximizer: boolean = false,
  alpha = -Infinity,
  beta = Infinity,
  root = true,
  countNode?: () => void,
): [number, Move] => {
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
    Sorts moves at first level by a single-level-deep evaluation. Searching through the best branches early on
    increases likelihood of pruning future branches
  */
  const legalMoves = findLegalMoves(board);
  const moves = root ? legalMoves.sort((a, b) => {
    const posA = snapshotEvaluation(testMove(a, board));
    const posB = snapshotEvaluation(testMove(b, board));
    return posA - posB;
  }) : legalMoves;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const nextBoardRep = testMove(move, board);
    value = getBestMove(nextBoardRep, depth - 1, !isMaximizer, alpha, beta, false, countNode)[0];
    if (countNode) countNode(); // Caller passes a callback that increments a counter. Can also be invoked in tests to evaluate efficiency.
    
    //Mini-max
    if (isMaximizer) {
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
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

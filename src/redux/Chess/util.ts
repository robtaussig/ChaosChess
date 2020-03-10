import { WhitePieces, BlackPieces } from './types';
import { makeMove } from '../../engine/board';

export const positionString = (from: number, to: number) => `${from}-${to}`;

export const getUniqueItemsFromArray = <T>(items: T[]): T[] => {
  return [...new Set<T>(items)];
};

export const getValidPiecesToMoveFromLegalMoveList =
  (moves: string[]): string[] => {
    return getUniqueItemsFromArray(moves.map(move => move.split('-')[0]));
  };

export const removeMoveThatCapturesKing =
  (moves: string[], board: string): string[] => {
    return moves.filter(move => {
      const [from, to] = move.split('-').map(Number);
      const nextBoard = makeMove(board, from, to);
      return nextBoard.includes(WhitePieces.King) &&
        nextBoard.includes(BlackPieces.King);
    });
  };

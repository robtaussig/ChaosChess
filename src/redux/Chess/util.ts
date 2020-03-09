import { CONSTANTS } from './constants';
import { WhitePieces, BlackPieces } from './types';

export const positionString = (from: number, to: number) => `${from}-${to}`;

export const flipBit = (board: string, pos: number) => {
  return board.slice(0, pos) +
    (board[pos] === '1' ? '0' : '1') +
    board.slice(pos + 1);
}

export const movePiece = (board: string, from: number, to: number) => {
  return board.split('').map((char, idx) => {
    if (idx === from) return CONSTANTS.EMPTY_SQUARE;
    if (idx === to) return board[from];
    return char;
  }).join('');
};

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
      const nextBoard = movePiece(board, from, to);
      return nextBoard.includes(WhitePieces.King) &&
        nextBoard.includes(BlackPieces.King);
    });
  };

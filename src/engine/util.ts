import {
  Move,
  Piece,
  BlackPieces,
  WhitePieces
} from './types';
import { nonPieces } from './constants';

export const joinMoves = (moves: Move[], movesToJoin: Move[]) => {
  for (let i = 0; i < movesToJoin.length; i++) {
    moves.push(movesToJoin[i]);
  }
};

export function assertBlack(isBlack: boolean, piece: Piece): piece is BlackPieces {
  return isBlack;
}

export function assertWhite(isBlack: boolean, piece: Piece): piece is WhitePieces {
  return !isBlack;
}

export function isPiece (piece: any): piece is Piece {
  return Boolean(!nonPieces[piece]);
}

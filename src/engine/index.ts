import {
  Color,
  WhitePieces,
  BlackPieces,
  A8Square,
  H1Square,
  Move,
  Board,
  Square,
} from './types';
import {
  getKingMoves,
  getQueenMoves,
  getRookMoves,
  getBishopMoves,
  getKnightMoves,
  getPawnMoves,
  testMove,
  bishopAttackers,
  rookAttackers,
  pawnAttackers,
  knightAttackers,
  kingAttackers,
  queenAttackers,
  getCurrentTurn,
} from './board';
import { joinMoves } from './util';
export { getBestMove } from './eval';
export { makeMove } from './board';

export const findLegalMoves = (board: Board): Move[] => {
  const legalMoves: Move[] = [];
  const currentColor = getCurrentTurn(board);
  
  for (let square: Square = A8Square; square <= H1Square; square++) {
    switch (board[square]) {
      case WhitePieces.King:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getKingMoves(square, board, currentColor));
        }
        break;
      case WhitePieces.Queen:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getQueenMoves(square, board, currentColor));
        }
        break;
      case WhitePieces.Rook:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getRookMoves(square, board, currentColor));
        }
        break;
      case WhitePieces.Bishop:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getBishopMoves(square, board, currentColor));
        }
        break;
      case WhitePieces.Knight:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getKnightMoves(square, board, currentColor));
        }
        break;
      case WhitePieces.Pawn:
        if (currentColor === Color.White) {
          joinMoves(legalMoves, getPawnMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.King:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getKingMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.Queen:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getQueenMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.Rook:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getRookMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.Bishop:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getBishopMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.Knight:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getKnightMoves(square, board, currentColor));
        }
        break;
      case BlackPieces.Pawn:
        if (currentColor === Color.Black) {
          joinMoves(legalMoves, getPawnMoves(square, board, currentColor));
        }
        break;
    }
  }

  return legalMoves.filter(el => !isCheck(testMove(el, board, false, false)));
};

export const isCheck = (board: Board) => {
  const currentColor = getCurrentTurn(board);

  const kingPos = currentColor === Color.White ?
    board.indexOf(WhitePieces.King) :
    board.indexOf(BlackPieces.King);
  
  if (bishopAttackers(kingPos, board, currentColor).length > 0) return true;
  if (rookAttackers(kingPos, board, currentColor).length > 0) return true;
  if (knightAttackers(kingPos, board, currentColor).length > 0) return true;
  if (queenAttackers(kingPos, board, currentColor).length > 0) return true;
  if (kingAttackers(kingPos, board, currentColor).length > 0) return true;
  if (pawnAttackers(kingPos, board, currentColor).length > 0) return true;

  return false;
};

export const fenToBoard = (fen: string): Board => {
  const [
    board,
    currentColor,
    castling,
  ] = fen.split(' ');

  const rows = board.split('/');
  let convertedBoard = '0000000000';
  rows.forEach((row, idx) => {
    convertedBoard += '0';
    row.split('').forEach(square => {
      if (isNaN(Number(square))) {
        convertedBoard += square;
      } else {
        for (let i = 0; i < Number(square); i++) {
          convertedBoard += '-';
        }
      }
    });
    convertedBoard += '0';
  });
  convertedBoard += '0000000000';
  convertedBoard += currentColor === 'b' ? '1' : '0';
  const convertedCastling: number[] = [1, 1, 1, 1];
  castling.split('').forEach(char => {
    switch (char) {
      case 'K':
        convertedCastling[0] = 0;
        break;
      case 'Q':
        convertedCastling[1] = 0;
        break;
      case 'k':
        convertedCastling[2] = 0;
        break;
      case 'q':
        convertedCastling[3] = 0;
        break;
    
      default:
        break;
    }
  });
  convertedBoard += convertedCastling.join('');
  convertedBoard += '000000';
  return convertedBoard;
};

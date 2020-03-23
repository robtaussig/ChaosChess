import {
  EMPTY_BOARD,
  WhitePieces,
  BlackPieces,
} from '../../redux/Chess';
import {
  WHITE_KING_MOVED_BIT,
  BLACK_KING_MOVED_BIT,
  BIT_ON,
} from '../../engine/constants';
import { Board } from '../../engine/types';
import { updateBoard, makeMove } from '../../engine/board';

type Pieces = WhitePieces | BlackPieces;
type Positions = { [pos: string]: Pieces };

const CHAOTIIC_PIECES_QUEUE: Pieces[] = [    
  WhitePieces.Queen,
  BlackPieces.Queen,
  WhitePieces.Rook,
  WhitePieces.Rook,
  BlackPieces.Rook,
  BlackPieces.Rook,
  WhitePieces.Bishop,
  WhitePieces.Bishop,
  BlackPieces.Bishop,
  BlackPieces.Bishop,
  WhitePieces.Knight,
  WhitePieces.Knight,
  BlackPieces.Knight,
  BlackPieces.Knight,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  WhitePieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  BlackPieces.Pawn,
  WhitePieces.King,
  BlackPieces.King,
];

const nullIfAdjacentTo = (
  pos: string,
  takenPositions: Positions,
  piece: Pieces,
): string => {
  const adjacentSquaresRelativeToPos = [
    -1, //Left
    1, //Right
    -10, //Up
    10, //Down
    -9, //Up-Left
    -11, //Up-Right
    9, //Down-Left
    11, //Down-Right
  ];
  for (let dir of adjacentSquaresRelativeToPos) {
    if (takenPositions[Number(pos) + dir] === piece) return null;
  }

  return pos;
}

const getPiecePosition = (piece: Pieces, takenPositions: Positions): Board => {
  let minCol = 1, maxCol = 8, minRow = 1, maxRow = 8, isKing = false;
  switch (piece) {
    case WhitePieces.Pawn:
      maxRow = 6;
      break;
    case BlackPieces.Pawn:
      minRow = 3;
      break;
    case BlackPieces.King:
      isKing = true;
      break;
  }

  let nextPos;
  while (!nextPos) {
    const testCol = Math.floor(Math.random() * (maxCol - minCol)) + minCol;
    const testRow = Math.floor(Math.random() * (maxRow - minRow)) + minRow;
    if (takenPositions[`${testRow}${testCol}`] === undefined) {
      nextPos = `${testRow}${testCol}`;
    }
    if (isKing) {
      nextPos = nullIfAdjacentTo(nextPos, takenPositions, WhitePieces.King);
    }
  }

  return nextPos;
};

export const getChaoticBoard = async (): Promise<string> => {
  const pieceQueue = [...CHAOTIIC_PIECES_QUEUE];
  const currentPositions: Positions = {};

  while (pieceQueue.length > 0) {
    const piece = pieceQueue.shift();
    const position = await getPiecePosition(piece, currentPositions);
    currentPositions[position] = piece;
  }
  
  return EMPTY_BOARD.split('').map((char, idx) => {
    if (currentPositions[idx]) return currentPositions[idx];
    if (WHITE_KING_MOVED_BIT === idx) return BIT_ON;
    if (BLACK_KING_MOVED_BIT === idx) return BIT_ON;
    return char;
  }).join('');
};

//Inclusive of min, exclusive of max
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const transformRandomPiece = (
  board: Board,
  pieceToReplace: any,
  nextPiece: any,
): Board => {
  const positions = board.split('')
    .map((piece, idx) => ({ piece, idx }))
    .filter(({ piece }) => piece === pieceToReplace)
    .map(({ idx }) => idx);
  if (positions.length > 0) {
    const positionToReplace = positions[random(0, positions.length)];
    return updateBoard(board, positionToReplace, nextPiece);
  }
  return board;
}

export const removeMoveThatCapturesKing =
  (moves: string[], board: string): string[] => {
    return moves.filter(move => {
      const [from, to] = move.split('-').map(Number);
      const nextBoard = makeMove(board, from, to);
      return nextBoard.includes(WhitePieces.King) &&
        nextBoard.includes(BlackPieces.King);
    });
  };

  export const getSemiChaoticBoard = async (): Promise<string> => {
    const pieceQueue = [...CHAOTIIC_PIECES_QUEUE];
    const kingPositions: Positions = {};
    const currentPositions: Positions = {};

    while (pieceQueue.length > 0) {
      const piece = pieceQueue.shift();
      const position = await getPiecePosition(piece, kingPositions);
      currentPositions[position] = piece;
      // This only reserves square for white king, meaning black king will not be
      // placed over it
      if (piece === WhitePieces.King) {
        kingPositions[position] = piece;
      }
    }
    
    return EMPTY_BOARD.split('').map((char, idx) => {
      if (currentPositions[idx]) return currentPositions[idx];
      if (WHITE_KING_MOVED_BIT === idx) return BIT_ON;
      if (BLACK_KING_MOVED_BIT === idx) return BIT_ON;
      return char;
    }).join('');
  }
  
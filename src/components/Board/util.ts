import {
  EMPTY_BOARD,
  WhitePieces,
  BlackPieces,
} from '../../redux/Chess';

type Pieces = WhitePieces | BlackPieces;
type Positions = { [pos: string]: Pieces };

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

const getPiecePosition = (piece: Pieces, takenPositions: Positions): string => {
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
  const pieceQueue: Pieces[] = [    
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
  const currentPositions: Positions = {};

  while (pieceQueue.length > 0) {
    const piece = pieceQueue.shift();
    const position = await getPiecePosition(piece, currentPositions);
    currentPositions[position] = piece;
  }
  
  return EMPTY_BOARD.split('').map((char, idx) => {
    if (currentPositions[idx]) return currentPositions[idx];
    return char;
  }).join('');
};

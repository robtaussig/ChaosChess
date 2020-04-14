export const flipPos = (pos: number): number => {
  const column = pos % 10;
  const row = Math.floor(pos / 10);
  const nextRow = 9 - row;
  const flippedPos = (nextRow * 10) + column;
  return flippedPos;
};

const pieceFlipper = (board: string) =>
  (piece: string, pos: number) => {
    if (pos > 10 && pos < 89) {
      const column = pos % 10;
      if (column > 0 && column < 9) {
        return board[flipPos(pos)];
      }
    } else if (pos === 107 || pos === 109) { //Row
      if (board[pos] !== '0') {
        return `${9 - Number(board[pos])}`;
      }
    }

    return piece;
  };

export const flippedBoard = (board: string, isFlipped: boolean): string => {
  if (isFlipped) {
    const flipPiece = pieceFlipper(board);

    return board
      .split('')
      .map(flipPiece)
      .join('');
  }

  return board;
};

export const flippedMoves = (moves: string[], isFlipped: boolean): string[] => {
  if (!moves) return moves;

  if (isFlipped) {
    return moves.map(move => {
      const [from, to] = move.split('-');
      return `${flipPos(Number(from))}-${flipPos(Number(to))}`;
    });
  }

  return moves;
};

export const flippedPieces = (pieces: string[], isFlipped: boolean): string[] => {
  if (isFlipped) {
    return pieces.map(piece => flipPos(Number(piece))).map(String);
  }

  return pieces;
};

export const flippedSquares = (squares: number[], isFlipped: boolean): number[] => {
  if (isFlipped) {
    return squares.map(flipPos);
  }

  return squares;
};

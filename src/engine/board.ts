import {
  Color,
  SpecialSquares,
  Piece,
  Move,
  Board,
  Square,
  MoveIncrement,
  SpecialMoves,
  CurrentColorBit,
} from './types';
import {
  BISHOP_MOVES,
  KNIGHT_MOVES,
  ROOK_MOVES,
  QUEEN_MOVES,
  KING_MOVES,
  WHITE_PAWN_INITIAL_MOVES,
  WHITE_PAWN_MOVES,
  BLACK_PAWN_INITIAL_MOVES,
  BLACK_PAWN_MOVES,
  LAST_MOVE_FROM_TENS,
  LAST_MOVE_FROM_ONES,
  LAST_MOVE_TO_TENS,
  LAST_MOVE_TO_ONES,
  BIT_ON,
  WHITE_QUEENSIDE_ROOK_MOVED_BIT,
  WHITE_KINGSIDE_ROOK_MOVED_BIT,
  BLACK_QUEENSIDE_ROOK_MOVED_BIT,
  BLACK_KINGSIDE_ROOK_MOVED_BIT,
  WHITE_KING_MOVED_BIT,
  BLACK_KING_MOVED_BIT,
} from './constants';

/**
 * TODO
 * Special move handling
 */

 //TODO
export const getSpecialMoves = (board: Board, color: Color): SpecialMoves => {
  return {
    queenSideCastle: true,
    kingSideCastle: true
  };
};

//TODO handle special moves
export const makeMove = (
  board: Board,
  from: Square,
  to: Square,
): Board => {
  // switch (this.board[from]) {
  //   case 'K':
  //     this.specialMoves.w.kingSideCastle = false;
  //     this.specialMoves.w.queenSideCastle = false;
  //     if (Math.abs(from - to) === 2) {
  //       this.castle(from, to);
  //     }
  //     break;
  //   case 'k':
  //     this.specialMoves.b.kingSideCastle = false;
  //     this.specialMoves.b.queenSideCastle = false;
  //     if (Math.abs(from - to) === 2) {
  //       this.castle(from, to);
  //     }
  //     break;

  //   case 'R':
  //     if (from == 81) {
  //       this.specialMoves.w.queenSideCastle = false;
  //     } else if (from == 88){
  //       this.specialMoves.w.kingSideCastle = false;
  //     }
  //     break;

  //   case 'r':
  //     if (from == 11) {
  //       this.specialMoves.b.queenSideCastle = false;
  //     } else if (from == 18){
  //       this.specialMoves.b.kingSideCastle = false;
  //     }
  //     break;
  
  //   default:
  //     break;
  //   }

  board = updateBoard(board, to, board[from]);
  board = updateBoard(board, from, '-');
 
  return swapColors(
    recordLastMove(board, from, to)
  );
};

export const recordLastMove = (board: Board, from: Square, to: Square): Board => {
  const fromTens = String(from)[0];
  const fromOnes = String(from)[1];
  const toTens = String(to)[0];
  const toOnes = String(to)[1];
  board = updateBoard(board, LAST_MOVE_FROM_TENS, fromTens);
  board = updateBoard(board, LAST_MOVE_FROM_ONES, fromOnes);
  board = updateBoard(board, LAST_MOVE_TO_TENS, toTens);
  return updateBoard(board, LAST_MOVE_TO_ONES, toOnes);
};

//Similar to makeMove, but without concern for specialBits
export const testMove = (
  move: Move,
  board: Board,
  withLastMove = false,
  withSwapColor = true,
): Board => {
  const [from, to] = move.split('-').map(Number);
  board = updateBoard(board, to, board[from]);
  board = updateBoard(board, from, '-');
  if (withSwapColor) board = swapColors(board);

  if (withLastMove) {
    return recordLastMove(
      board,
      from,
      to
    );
  }

  return board;
};

export const canCastleKingSide = (
  position: Square,
  board: Board,
  color: Color,
) => {
  const emptySpaceBetween = board[position + 1] === SpecialSquares.Empty &&
    board[position + 2] === SpecialSquares.Empty;

  if (emptySpaceBetween) {
    if (color === Color.White) {
      const whiteKingHasMoved = board[WHITE_KING_MOVED_BIT] === BIT_ON;
      const whiteKingSideRookHasMoved = board[WHITE_KINGSIDE_ROOK_MOVED_BIT] === BIT_ON;
      return !(whiteKingHasMoved || whiteKingSideRookHasMoved);
    } else {
      const blackKingHasMoved = board[BLACK_KING_MOVED_BIT] === BIT_ON;
      const blackKingSideRookHasMoved = board[BLACK_KINGSIDE_ROOK_MOVED_BIT] === BIT_ON;
      return !(blackKingHasMoved || blackKingSideRookHasMoved);
    }
  }
  return false;
};

export const canCastleQueenSide = (
  position: Square,
  board: Board,
  color: Color,
) => {
  const emptySpaceBetween = board[position - 1] === SpecialSquares.Empty &&
    board[position - 2] === SpecialSquares.Empty &&
    board[position - 3] === SpecialSquares.Empty;
  
  if (emptySpaceBetween) {
    if (color === Color.White) {
      const whiteKingHasMoved = board[WHITE_KING_MOVED_BIT] === BIT_ON;
      const whiteQueenSideRookHasMoved = board[WHITE_QUEENSIDE_ROOK_MOVED_BIT] === BIT_ON;
      return !(whiteKingHasMoved || whiteQueenSideRookHasMoved);
    } else {
      const blackKingHasMoved = board[BLACK_KING_MOVED_BIT] === BIT_ON;
      const blackQueenSideRookHasMoved = board[BLACK_QUEENSIDE_ROOK_MOVED_BIT] === BIT_ON;
      return !(blackKingHasMoved || blackQueenSideRookHasMoved);
    }
  }

  return false;
};

export const castle = (board: Board, from: Square, to: Square): Board => {
  if (from > to) {
    board = updateBoard(board, to + 1, board[from - 4]);
    board = updateBoard(board, from - 4, SpecialSquares.Empty);
  } else {
    board = updateBoard(board, to - 1, board[from + 3]);
    board = updateBoard(board, from + 3, SpecialSquares.Empty);
  }

  return board;
};

export const getBishopMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  return getSlidingPiecesMovements(position, board, color, BISHOP_MOVES);
};

export const getColor = (
  position: Square,
  board: Board,
): Color => {
  if (
    !board[position] ||
    board[position] == SpecialSquares.Boundary ||
    board[position] === SpecialSquares.Empty
  ) {
    return null;
  }

  return board[position].toUpperCase() === board[position] ?
    Color.White :
    Color.Black;
};

export const getKnightMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  return getSteppingPiecesMovements(position, board, color, KNIGHT_MOVES);
};

export const getKingMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  const legalMoves: Move[] = [];
  const specialMoves = getSpecialMoves(board, color);

  if (
    specialMoves.kingSideCastle &&
    board[position + 1] === SpecialSquares.Empty &&
    board[position + 2] === SpecialSquares.Empty
  ) {
    legalMoves.push(`${position}-${position + 2}`);
  }
  
  if (
    specialMoves.queenSideCastle &&
    board[position - 1] === SpecialSquares.Empty &&
    board[position - 2] === SpecialSquares.Empty &&
    board[position - 3] === SpecialSquares.Empty
  ) {
    legalMoves.push(`${position}-${position - 2}`);
  }

  return legalMoves.concat(
    getSteppingPiecesMovements(position, board, color, KING_MOVES)
  );
};

export const getPawnMovements = (
  position: Square,
  board: Board,
  color: Color,
  increments: MoveIncrement[],
): Move[] => {
  const legalMoves: Move[] = [];

  for (let i = 0; i < increments.length; i++) {
    const pointer = position + increments[i];
    if (board[pointer] === SpecialSquares.Empty) {
      legalMoves.push(`${position}-${pointer}`);
    } else {
      break;
    }
  }

  const leftCapture = getColor(position + increments[0] - 1, board);
  const rightCapture = getColor(position + increments[0] + 1, board);

  if (leftCapture && leftCapture !== color) {
    legalMoves.push(`${position}-${position + increments[0] - 1}`);
  }
  if (rightCapture && rightCapture !== color) {
    legalMoves.push(`${position}-${position + increments[0] + 1}`);
  }

  return legalMoves;
};

export const getPawnMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  if (color === Color.White && position > 70 && position < 79) {
    return getPawnMovements(position, board, color, WHITE_PAWN_INITIAL_MOVES);
  } else if (color === Color.White && position > 20 && position < 29) {
    return getPawnMovements(position, board, color, BLACK_PAWN_INITIAL_MOVES);
  } else if (color === Color.White){
    return getPawnMovements(position, board, color, WHITE_PAWN_MOVES);
  } else {
    return getPawnMovements(position, board, color, BLACK_PAWN_MOVES);
  }
};

export const getQueenMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  return getSlidingPiecesMovements(position, board, color, QUEEN_MOVES);
};

export const getRookMoves = (
  position: Square,
  board: Board,
  color: Color,
): Move[] => {
  return getSlidingPiecesMovements(position, board, color, ROOK_MOVES);
};

export const getSlidingPiecesMovements = (
  position: Square,
  board: Board,
  color: Color,
  increments: MoveIncrement[]
): Move[] => {
  const legalMoves: Move[] = [];

  for (let i = 0; i < increments.length; i++) {
    let pointer = position;
    while (board[pointer]) {
      pointer += increments[i];
      if (board[pointer] === SpecialSquares.Empty) {
        legalMoves.push(`${position}-${pointer}`);
      } else if (getColor(pointer, board) && getColor(pointer, board) !== color) {
        legalMoves.push(`${position}-${pointer}`);
        break;
      } else {
        break;
      }
    }
  }

  return legalMoves;
};

export const getSteppingPiecesMovements = (
  position: Square,
  board: Board,
  color: Color,
  increments: MoveIncrement[],
): Move[] => {
  const legalMoves: Move[] = [];

  for (let i = 0; i < increments.length; i++) {
    let pointer = position + increments[i];
    if (!board[pointer]) {
      continue;
    } else if (board[pointer] === SpecialSquares.Empty) {
      legalMoves.push(`${position}-${pointer}`);
    } else if (getColor(pointer, board) && getColor(pointer, board) !== color) {
      legalMoves.push(`${position}-${pointer}`);
    }
  }

  return legalMoves;
};

export const attackers = (
  moves: Move[],
  board: Board,
  color: Color,
  type: Piece,
): number[] => {
  const attackers: number[] = [];
  for (let i = 0; i < moves.length; i++) {
    const to = Number(moves[i].split('-')[1]);
    if (
      board[to].toUpperCase() === type.toUpperCase() &&
      getColor(to, board) !== color
    ) {
      attackers.push(to);
    }
  }

  return attackers;
};

export const bishopAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getBishopMoves(position, board, color),
  board, color, 'B'
);

export const kingAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getKingMoves(position, board, color),
  board, color, 'K'
);

export const knightAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getKnightMoves(position, board, color),
  board, color, 'N'
);

export const pawnAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getPawnMoves(position, board, color),
  board, color, 'P'
);

export const queenAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getQueenMoves(position, board, color),
  board, color, 'Q'
);

export const rookAttackers = (
  position: Square,
  board: Board,
  color: Color,
): number[] => attackers(
  getRookMoves(position, board, color),
  board, color, 'R'
);

export const getCurrentTurn = (board: Board): Color => {
  return (board[CurrentColorBit.position] as Color) === CurrentColorBit.White ?
    Color.White :
    Color.Black;
};


const swapColors = (board: Board): Board => {
  const nextColor = board[CurrentColorBit.position] === CurrentColorBit.White ?
      CurrentColorBit.Black :
      CurrentColorBit.White;

  return board.substr(0,CurrentColorBit.position)
   + nextColor
   + board.substr(CurrentColorBit.position + 1);
};

export const updateBoard = (
  board: Board,
  position: Square,
  replacement: Piece,
): Board => {
  return board.substr(0, position)
    + replacement
    + board.substr(position + 1);
};

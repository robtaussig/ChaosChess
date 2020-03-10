export const BISHOP_MOVES = [9, 11, -9, -11];
export const KNIGHT_MOVES = [-12, -21, -19, -8, 12, 21, 19, 8];
export const ROOK_MOVES = [-1, 1, -10, 10];
export const QUEEN_MOVES = [...BISHOP_MOVES, ...ROOK_MOVES];
export const KING_MOVES = [...QUEEN_MOVES];
export const WHITE_PAWN_INITIAL_MOVES = [-10, -20];
export const WHITE_PAWN_MOVES = [-10];
export const BLACK_PAWN_INITIAL_MOVES = [10, 20];
export const BLACK_PAWN_MOVES = [10];
export const DEFAULT_BOARD = '00000000000rnbqkbnr00pppppppp00--------00--------00--------00--------00PPPPPPPP00RNBQKBNR0000000000000000000000';
export const EMPTY_BOARD = '00000000000--------00--------00--------00--------00--------00--------00--------00--------0000000000000000000000';
export const BIT_ON = '1';
export const BIT_OFF = '0';
export const WHITE_QUEENSIDE_ROOK_MOVED_BIT = 101;
export const WHITE_KINGSIDE_ROOK_MOVED_BIT = 102;
export const BLACK_QUEENSIDE_ROOK_MOVED_BIT = 103;
export const BLACK_KINGSIDE_ROOK_MOVED_BIT = 104;
export const WHITE_KING_MOVED_BIT = 105;
export const BLACK_KING_MOVED_BIT = 106;
export const LAST_MOVE_FROM_TENS = 107;
export const LAST_MOVE_FROM_ONES = 108;
export const LAST_MOVE_TO_TENS = 109;
export const LAST_MOVE_TO_ONES = 110;
export const nonPieces: { [type: string]: boolean } = {
  '0': true,
  '-': true,
};

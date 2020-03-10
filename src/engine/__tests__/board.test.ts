// import {

// } from '../';

describe('Board', () => {
  it('It works for its basic use-case', () => {

  });
});

// const {
//   Board,
//   Eval,
//   positionString,
//   movedToPositionFromString,
//   movedFromPositionFromString,
//   testMove,
//   CURRENT_TURN_BLACK_BIT,
//   BIT_ON,
//   BIT_OFF,
//   WHITE_QUEENSIDE_ROOK_MOVED_BIT,
//   WHITE_KINGSIDE_ROOK_MOVED_BIT,
//   BLACK_QUEENSIDE_ROOK_MOVED_BIT,
//   BLACK_KINGSIDE_ROOK_MOVED_BIT,
//   WHITE_KING_MOVED_BIT,
//   BLACK_KING_MOVED_BIT,
//   LAST_MOVE_FROM_TENS,
//   LAST_MOVE_FROM_ONES,
//   LAST_MOVE_TO_TENS,
//   LAST_MOVE_TO_ONES,
// } = require('./Game');

// const INITIAL_BOARD = '00000000000rnbqkbnr00pppppppp00--------00--------00--------00--------00PPPPPPPP00RNBQKBNR0000000000000000000000';

// const moveMap = [8, 7, 6, 5, 4, 3, 2, 1].reduce((acc, row, rowIdx) => {
//   ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach((col, colIdx) => {
//     acc[`${col}${row}`] = Number(`${rowIdx + 1}${colIdx + 1}`);
//   });
//   return acc;
// }, {});

// const chessMoveMap = [8, 7, 6, 5, 4, 3, 2, 1].reduce((acc, row, rowIdx) => {
//   ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach((col, colIdx) => {
//     acc[`${rowIdx + 1}${colIdx + 1}`] = `${col}${row}`;
//   });
//   return acc;
// }, {});

// const fromChessMove = chessMove => {
//   const from = chessMove.split('-')[0];
//   const to = chessMove.split('-')[1];
//   return `${moveMap[from.toLowerCase()]}-${moveMap[to.toLowerCase()]}`;
// };

// const toChessMove = boardMove => {
//   const from = boardMove.split('-')[0];
//   const to = boardMove.split('-')[1];
//   return `${chessMoveMap[from.toLowerCase()]}-${chessMoveMap[to.toLowerCase()]}`;
// };

// const movesToBoard = (listOfMoves, board = INITIAL_BOARD) => {
//   let currentBoard = new Board(board);
//   listOfMoves.forEach(move => {
//     const boardMove = fromChessMove(move);
//     const from = movedFromPositionFromString(boardMove);
//     const to = movedToPositionFromString(boardMove);
//     currentBoard.makeMove(from, to);
//   });

//   return currentBoard;
// };

// const fromTo = moveString => {
//   return moveString.split('-');
// };

// describe('Helper functions', () => {
//   test('Converters properly convert chess moves to board moves', () => {
//     expect(fromChessMove('E2-E4')).toEqual('75-55');
//     expect(toChessMove('75-55')).toEqual('e2-e4');
//     expect(fromChessMove('E1-G1')).toEqual('85-87');
//     expect(toChessMove('85-87')).toEqual('e1-g1');
//     expect(fromChessMove('a8-h8')).toEqual('11-18');
//     expect(toChessMove('11-18')).toEqual('a8-h8');
//   });

//   test('TestMove creates a new string of a board given a board state and a move', () => {
//     const firstMove = 'E2-E4';
//     const toBoardMove = fromChessMove(firstMove);
//     const nextBoard = testMove(toBoardMove, INITIAL_BOARD);
//     const from = movedFromPositionFromString(toBoardMove);
//     const to = movedToPositionFromString(toBoardMove);
//     expect(nextBoard).not.toEqual(INITIAL_BOARD);
//     expect(nextBoard[from]).toEqual('-');
//     expect(nextBoard[to]).toEqual(INITIAL_BOARD[from]);

//     const secondMove = 'B8-C6';
//     const secondToBoardMove = fromChessMove(secondMove);
//     const secondNextBoard = testMove(secondToBoardMove, nextBoard);
//     const secondFrom = movedFromPositionFromString(secondToBoardMove);
//     const secondTo = movedToPositionFromString(secondToBoardMove);
//     expect(secondNextBoard).not.toEqual(INITIAL_BOARD);
//     expect(secondNextBoard[secondFrom]).toEqual('-');
//     expect(secondNextBoard[secondTo]).toEqual(nextBoard[secondFrom]);
//   });

//   test('TestMove toggles current turn', () => {
//     expect(INITIAL_BOARD[CURRENT_TURN_BLACK_BIT]).toEqual(BIT_OFF);
//     const firstMove = 'E2-E4';
//     const toBoardMove = fromChessMove(firstMove);
//     const nextBoard = testMove(toBoardMove, INITIAL_BOARD);
//     expect(nextBoard[CURRENT_TURN_BLACK_BIT]).toEqual(BIT_ON);
//     const secondMove = 'B8-C6';
//     const secondToBoardMove = fromChessMove(secondMove);
//     const secondNextBoard = testMove(secondToBoardMove, nextBoard);
//     expect(secondNextBoard[CURRENT_TURN_BLACK_BIT]).toEqual(BIT_OFF);
//   });
// });

// describe('Board', () => {
//   describe('Initialization', () => {
//     test('Initializes board without parameter', () => {
//       const testBoard = new Board();
//       expect(testBoard.board).toEqual(INITIAL_BOARD);
//     });
  
//     test('Initializes with given board as paramater', () => {
//       const firstMove = 'E2-E4';
//       const toBoardMove = fromChessMove(firstMove);
//       const from = movedFromPositionFromString(toBoardMove);
//       const to = movedToPositionFromString(toBoardMove);
//       const nextBoard = testMove(toBoardMove, INITIAL_BOARD);
//       const testBoard = new Board(nextBoard);
//       expect(testBoard.board).not.toEqual(INITIAL_BOARD);
//       expect(testBoard.board[to]).toEqual(INITIAL_BOARD[from]);
//     });
//   });

//   describe('Legal Moves', () => {
//     test('Finds all legal moves in constructor', () => {
//       const testBoard = new Board();
//       expect(testBoard.legalMoves).toHaveLength(20);
//     });
  
//     test('Will not include any move that leaves the player in check', () => {
//       const boardWithQueenPinningBlackPawn = '00000000000rnbqkbnr00pppp-ppp00--------00----p--Q00----P---00--------00PPPP-PPP00RNB-KBNR0000000000010000008448';
//       const firstMove = 'E2-E4';
//       const toBoardMove = fromChessMove(firstMove);
//       const nextBoard = testMove(toBoardMove, INITIAL_BOARD);
//       const initialTestBoard = new Board(nextBoard);
//       expect(initialTestBoard.legalMoves).toContain('26-36');
//       const pinnedBoard = new Board(boardWithQueenPinningBlackPawn);
//       expect(pinnedBoard.legalMoves).not.toContain('26-36');
//     });
    
//     test('Supports castling', () => {
//       const boardBeforeCastle = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'F8-C5', 'G1-F3', 'G8-F6']);
//       const legalMoves = boardBeforeCastle.findLegalMoves();
//       const whiteKingSideCastle = fromChessMove('E1-G1');
//       expect(legalMoves).toContain(whiteKingSideCastle);
//       const from = movedFromPositionFromString(whiteKingSideCastle);
//       const to = movedToPositionFromString(whiteKingSideCastle);
//       boardBeforeCastle.makeMove(from, to);
//       const nextLegalMoves = boardBeforeCastle.findLegalMoves();
//       const blackKingSideCastle = fromChessMove('E8-G8');
//       expect(nextLegalMoves).toContain(blackKingSideCastle);
//     });
  
//     test('Cannot castle if rook or king has moved', () => {
//       const boardBeforeCastle = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'F8-C5', 'G1-F3', 'G8-F6', 'E1-G1', 'H8-G8', 'G1-E1', 'G8-H8']);
//       const legalMoves = boardBeforeCastle.findLegalMoves();
//       expect(legalMoves).not.toContain(fromChessMove('E1-G1'));
//       boardBeforeCastle.makeMove(71, 51);
//       const nextLegalMoves = boardBeforeCastle.findLegalMoves();
//       expect(nextLegalMoves).not.toContain(fromChessMove('E8-G8'));
//     });
  
//     test('Cannot castle through check', () => {
//       const boardBeforeCastle = movesToBoard(['E2-E4', 'E7-E5', 'F1-A6', 'B7-B5', 'G1-F3', 'C8-A6']); // Black B-pawn is blocking bishop, so white can check
//       const legalMoves = boardBeforeCastle.findLegalMoves();
//       const whiteKingSideCastle = fromChessMove('E1-G1');
//       expect(legalMoves).toContain(whiteKingSideCastle);
//       boardBeforeCastle.makeMove(71, 51); //Arbitrary move for white
//       boardBeforeCastle.makeMove(42, 52); //Black moves pawn up, opening up attack from bishop and blocking castle.
//       const nextLegalMoves = boardBeforeCastle.findLegalMoves();
//       expect(nextLegalMoves).not.toContain(whiteKingSideCastle);
//     });

//     test('Pawns can move 2 spaces if it is their first move', () => {
//       const testBoard = new Board();
//       const moveTwoSpaces = fromChessMove('E2-E4');
//       expect(testBoard.legalMoves).toContain(moveTwoSpaces);
//       const nextBoard = movesToBoard(['E2-E3', 'E7-E5']);
//       const legalMoves = nextBoard.findLegalMoves();
//       expect(legalMoves).not.toContain(fromChessMove(moveTwoSpaces));
//     });

//     test('Includes moves that capture opposing pieces', () => {
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'G8-F6']);
//       const legalMoves = testBoard.findLegalMoves();
//       expect(legalMoves).toContain(fromChessMove('C4-F7'));
//     });

//     test('Pawns can only capture diagonally', () => {
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'D7-D5']);
//       const legalMoves = testBoard.findLegalMoves();
//       expect(legalMoves).toContain(fromChessMove('E4-D5'));
//       expect(legalMoves).not.toContain(fromChessMove('E4-E5'));
//     });

//     test('Returns empty array on checkmate', () => {
//       const checkmatedBoard = new Board('00000000000r-bqkbnr00-ppp-Qpp00p-n-----00----p---00--B-P---00--------00PPPP-PPP00RNB-K-NR0000000000010000006626');
//       expect(checkmatedBoard.legalMoves).toHaveLength(0);
//     })
//   });

//   describe('Unit tests', () => {    
//     test('Board#findLegalMoves', () => {
//       const initialBoard = new Board();
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5']);
//       const legalMoves = testBoard.findLegalMoves();
//       expect(initialBoard.legalMoves).toHaveLength(20);
//       expect(legalMoves).toHaveLength(29);
//     });

//     test('Board#getBishopMoves', () => {
//       const initialBoard = new Board();
//       const initialBishopMoves = initialBoard.getBishopMoves(moveMap['f1'],initialBoard.board, 'w');
//       expect(initialBishopMoves).toHaveLength(0);
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5']);
//       const bishopMoves = testBoard.getBishopMoves(moveMap['f1'],testBoard.board, 'w');
//       expect(bishopMoves).toHaveLength(5);
//     });

//     test('Board#getColor', () => {
//       const initialBoard = new Board();
//       expect(initialBoard.getColor(moveMap['e2'])).toBe('w');
//       expect(initialBoard.getColor(moveMap['e7'])).toBe('b');
//     });

//     test('Board#getKnightMoves', () => {
//       const initialBoard = new Board();
//       const initialKnightMoves = initialBoard.getKnightMoves(moveMap['g1'],initialBoard.board, 'w');
//       expect(initialKnightMoves).toHaveLength(2);
//       const testBoard = movesToBoard(['G1-F3', 'E7-E5']);
//       const knightMoves = testBoard.getKnightMoves(moveMap['f3'],testBoard.board, 'w');
//       expect(knightMoves).toHaveLength(5);
//     });

//     test('Board#getKingMoves', () => {
//       const initialBoard = new Board();
//       const initialKingMoves = initialBoard.getKingMoves(moveMap['e1'],initialBoard.board, 'w');
//       expect(initialKingMoves).toHaveLength(0);
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'G8-F6']);
//       const kingMoves = testBoard.getKingMoves(moveMap['e1'],testBoard.board, 'w');
//       expect(kingMoves).toHaveLength(2);
//     });

//     test('Board#getPawnMovements', () => {
//       const initialBoard = new Board();
//       const initialPawnMoves = initialBoard.getPawnMoves(moveMap['e2'],initialBoard.board, 'w');
//       expect(initialPawnMoves).toHaveLength(2);
//       const testBoard = movesToBoard(['E2-E3', 'E7-E5']);
//       const pawnMoves = testBoard.getPawnMoves(moveMap['e3'],testBoard.board, 'w');
//       expect(pawnMoves).toHaveLength(1);
//     });

//     test('Board#getQueenMoves', () => {
//       const initialBoard = new Board();
//       const initialQueenMoves = initialBoard.getQueenMoves(moveMap['d1'],initialBoard.board, 'w');
//       expect(initialQueenMoves).toHaveLength(0);
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5', 'D2-D4', 'G8-F6', 'C1-F4', 'A7-A6']);
//       const queenMoves = testBoard.getQueenMoves(moveMap['d1'],testBoard.board, 'w');
//       expect(queenMoves).toHaveLength(7);
//     });

//     test('Board#getRookMoves', () => {
//       const initialBoard = new Board();
//       const initialRookMoves = initialBoard.getRookMoves(moveMap['h1'],initialBoard.board, 'w');
//       expect(initialRookMoves).toHaveLength(0);
//       const testBoard = movesToBoard(['E2-E4', 'E7-E5', 'G1-F3', 'G8-F6', 'F1-C4', 'A7-A6', 'H2-H4', 'H7-H6']);
//       const rookMoves = testBoard.getRookMoves(moveMap['h1'],testBoard.board, 'w');
//       expect(rookMoves).toHaveLength(4);
//     });

//     test('Board#isCheck', () => {
//       const initialBoard = movesToBoard(['E2-E4', 'E7-E5', 'D1-H5']);
//       const testBoard = movesToBoard(['E2-E4', 'F7-F5', 'D1-H5']);
//       expect(initialBoard.isCheck()).toBeFalsy();
//       expect(testBoard.isCheck()).toBeTruthy();
//     });

//     test('Board#makeMove', () => {
//       const initialBoard = new Board();
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_OFF);
//       expect(initialBoard.currentTurn).toBe('w');
//       initialBoard.makeMove(...fromTo(fromChessMove('E2-E4')));
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_ON);
//       expect(initialBoard.currentTurn).toBe('b');
//       initialBoard.makeMove(...fromTo(fromChessMove('E7-E5')));
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_OFF);
//       expect(initialBoard.board[WHITE_KING_MOVED_BIT]).toBe(BIT_OFF);
//       initialBoard.makeMove(...fromTo(fromChessMove('E1-E2')));
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_ON);
//       expect(initialBoard.board[WHITE_KING_MOVED_BIT]).toBe(BIT_ON);
//       const nextBoard = movesToBoard(['E2-E4', 'E7-E5', 'F1-C4', 'G8-F6', 'G1-F3', 'F8-C5']);
//       expect(nextBoard.board[WHITE_KINGSIDE_ROOK_MOVED_BIT]).toBe(BIT_OFF);
//       nextBoard.makeMove(...fromTo(fromChessMove('H1-G1')));
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_ON);
//       expect(nextBoard.board[WHITE_KINGSIDE_ROOK_MOVED_BIT]).toBe(BIT_ON);
//       expect(nextBoard.board[BLACK_KINGSIDE_ROOK_MOVED_BIT]).toBe(BIT_OFF);
//       nextBoard.makeMove(...fromTo(fromChessMove('H8-G8')));
//       expect(initialBoard.board[CURRENT_TURN_BLACK_BIT]).toBe(BIT_ON);
//       expect(nextBoard.board[BLACK_KINGSIDE_ROOK_MOVED_BIT]).toBe(BIT_ON);
//     });
//   });
// });

// describe('Evalulation', () => {
//   describe('Unit tests', () => {
//     test('Eval#getPositionalEvaluation', () => {
//       const testBoard = new Board('00000000000rnbq-bnr00pp-pkppp00--p-p---00--------00--B-P---00N-------00PPPP-PPP00R-BQK-NR0000000000000000011525');
//       const badBlackKing = Eval.getPositionalEvaluation(testBoard.board, 'k', 25, true); //Moved to bad position
//       const originalSpotWhiteKing = Eval.getPositionalEvaluation(testBoard.board, 'K', 85, false); //Stil on original square
//       expect(originalSpotWhiteKing).toBeGreaterThan(badBlackKing);

//       const blackPawnOnA5 = Eval.getPositionalEvaluation(testBoard.board, 'p', 41, true);
//       const blackPawnOnE5 = Eval.getPositionalEvaluation(testBoard.board, 'p', 45, true);
//       expect(blackPawnOnE5).toBeGreaterThan(blackPawnOnA5);

//       const assymetries = [];
//       ['p', 'r', 'b', 'n', 'q', 'k'].forEach(piece => {
//         const whitePiece = piece.toUpperCase();
//         const blackPiece = piece.toLowerCase();

//         [1, 2, 3, 4, 5, 6, 7, 8].forEach(row => {
//           [1, 2, 3, 4, 5, 6, 7, 8].forEach(col => {
//             const blackSquare = `${row}${col}`;
//             const whiteSquare = `${9 - row}${col}`;
//             const whiteEval = Eval.getPositionalEvaluation(INITIAL_BOARD, whitePiece, whiteSquare, false);
//             const blackEval = Eval.getPositionalEvaluation(INITIAL_BOARD, blackPiece, blackSquare, true);
//             if (whiteEval !== blackEval) {
//               assymetries.push({
//                 blackSquare,
//                 whiteSquare,
//                 whiteEval,
//                 blackEval,
//                 whitePiece,
//                 blackPiece,
//               });
//             }
//           });
//         });
//       });
//       expect(assymetries).toHaveLength(0);
//     });

//     test('Eval#snapshotEvaluation', () => {
//       const initialBoardEval = Eval.snapshotEvaluation(INITIAL_BOARD);
//       expect(initialBoardEval).toEqual(0);

//       const blackUpInMaterialWhiteTurn = '00000000000r-bq-b-r00pppp-kpp00-----n--00----p---00----P---00-----Q--00PPP-nPPP00RNB-K--R0000000000000000015475';
//       const initialEval = Eval.snapshotEvaluation(blackUpInMaterialWhiteTurn);
//       expect(initialEval).toBeLessThan(0);
//       const nextBoard = testMove(fromChessMove('H2-H4'), blackUpInMaterialWhiteTurn); //White moves
//       const nextEval = Eval.snapshotEvaluation(nextBoard);
//       expect(nextEval).toBeGreaterThan(0);

//       const whiteHasSuperiorPosition = '00000000000rn-q-bnr00--ppp-kp00b-------00pp---pp-00--BPP---00--N-BN--00PPP--PPP00R--Q-RK-0000000000000000111331';
//       const whiteEval = Eval.snapshotEvaluation(whiteHasSuperiorPosition);
//       expect(whiteEval).toBeGreaterThan(0);
//       const whiteMoves = testMove(fromChessMove('H2-H3'), whiteHasSuperiorPosition);
//       const blackEval = Eval.snapshotEvaluation(whiteMoves);
//       expect(blackEval).toBeLessThan(0);
//     });

//     test('Eval#getBestMove', () => {
//       const whiteHasCheckmateOrCapture = '00000000000r-bqk-nr00pppp-ppp00--n-----00----p---00--B-P---00b----Q--00PPPP-PPP00RNB-K-NR0000000000000000001661';
//       const bestMove = Eval.getBestMove(whiteHasCheckmateOrCapture);
//       expect(bestMove[1]).toBe(fromChessMove('F3-F7'));
//     });
//   });

//   describe('Finds best move', () => {
//     test('Finds mate in 2 at depth 4', () => {
//       let nodesExplored = 0;
//       const counter = () => nodesExplored++;
//       const mateInTwo = '00000000000B----q--00----N--K00rr--pP--00---p--p-00p--k----00NpR-RP--00------Pp00-------n0000000000001111111232';
//       const bestMove = Eval.getBestMove(mateInTwo, counter, 4);
//       expect(bestMove[1]).toBe(fromChessMove('E7-C6'));
//       expect(nodesExplored).toBeLessThan(9000); //Baseline from beginning implementation;
//     });
//     test('Finds mate in 3 at depth 6', () => {
//       const mateInThree = '00000000000Br-B-q--00----N--K00r---pP--00---p--p-00p--k----00NpR-RP--00------Pp00-------n0000000000001111111312';
//       const bestMove = Eval.getBestMove(mateInThree, ()=>{}, 6);
//       expect(bestMove[1]).toBe(fromChessMove('D8-B6'));
//       const newMateInThree = '00000000000-k-r----00ppr-nq-p00--p-b-p-00----Pp--00N-P--P--00R---Q---00PP--B--P00-KR-----0000000000001111112737';
//       const newBestMove = Eval.getBestMove(newMateInThree, ()=>{}, 6);
//       expect(newBestMove[1]).toBe(fromChessMove('E3-A7'));
//     });
//   });
// });
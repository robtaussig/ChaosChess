// const { Board, Eval, testMove } = require('../Game');
// const { MysqlHelper } = require('../../../mysqlHelper.js');
// const db = new MysqlHelper(true);

// const fs = require('fs');

// const lines = fs.readFileSync("./lib/shared/chess/lib/openings.txt", "utf-8").split('\n');

// const moveRegEx = /\d\.\s/;

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

// const filteredMoves = lines.filter(line => moveRegEx.test(line));

// const stripMoveNumFromLine = line => {
//   return line.slice(3);
// };

// const splitLine = line => {
//   return line.split(' ');
// };

// const splitByOpening = filteredLines => {
//   let opening = [];
//   let openings = [];
//   let lastNum;
//   filteredLines.forEach(line => {
//     if (line.startsWith('1. ')) {
//       openings.push(opening);
//       opening = [];
//       lastNum = 0;
//     }
//     if (Number(line[0]) === lastNum + 1) {
//       opening = opening.concat(...splitLine(stripMoveNumFromLine(line)));
//       lastNum = Number(line[0]);
//     }
//   });
//   return openings;
// };

// const replaceCaptureWithHyphen = move => {
//   return move.replace('x', '-');
// };

// const stripCapitalLetters = move => {
//   return move.replace(/[A-Z]/g, '');
// };

// const stripCheck = move => {
//   return move.replace('+', '');
// };

// const convertCastle = (move, idx) => {
//   if (idx % 2) {
//     if (move === '0-0') {
//       return 'e8-g8';
//     } else if (move === '0-0-0') {
//       return 'e8-c8';
//     }
//   } else if (move === '0-0') {
//     return 'e1-g1';
//   }
//   return move;
// };

// const convertMoves = openings => {
//   return openings.map(opening => {
//     return opening.map((move, idx) => {
//       return fromChessMove(
//         stripCheck(
//           replaceCaptureWithHyphen(
//             stripCapitalLetters(
//               convertCastle(move, idx)))));
//     });
//   });
// };

// const openingChunks = convertMoves(splitByOpening(filteredMoves));

// const INITIAL_BOARD = '00000000000rnbqkbnr00pppppppp00--------00--------00--------00--------00PPPPPPPP00RNBQKBNR0000000000000000000000';

// const boardMaps = {};
// const processMove = (board, move) => {
//   if (board && board.indexOf('undefined') === -1 && move && move.indexOf('undefined') === -1) {
//     boardMaps[board] = move;
//   }
// };

// const addMove = (board, move) => {
//   db.insert('chessBestMoves', {
//     board,
//     bestMove: move,
//     inOpeningBook: 1,
//     nodesExplored: 0,
//   });
// };

// db.setUpTables()
//   .then(() => {
//     const randomized = openingChunks.sort(() => Math.random() - 0.5);
//     for (let i = 0; i < randomized.length; i++) {
//       const opening = randomized[i];
//       let lastBoard = INITIAL_BOARD;
//       for (let j = 0; j < opening.length; j++) {
//         const move = opening[j];
//         processMove(lastBoard, move);
//         lastBoard = testMove(move, lastBoard, true);
//       }
//     }
//     for (let board in boardMaps) {
//       if (boardMaps.hasOwnProperty(board)) {
//         addMove(board, boardMaps[board]);
//       }
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });
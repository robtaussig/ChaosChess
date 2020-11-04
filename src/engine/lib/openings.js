const { Chess } = require('chess.js');
const openings = require('./openings_db');

const boardMap = {};

openings.forEach(opening => {
  const game = new Chess();
  opening.forEach(movePair => {    
    let [board, color] = game.fen().split(' ');
    board = `${board} ${color}`;
    movePair.split(' ').forEach(move => {
      game.move(move, { sloppy: true });
      let [newBoard, color] = game.fen().split(' ');
      boardMap[board] = boardMap[board] || [];
      boardMap[board].push(move);
      board = `${newBoard} ${color}`;
    });
  });
});

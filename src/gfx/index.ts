//@ts-nocheck

import Board from './board';

export default class Game {
  public board: Board;
  
  constructor(element, board, onMove) {
    this.canvas = element;
    this.ctx = this.canvas.getContext('2d');
    this.onMove = onMove;
    this.init(board);
  }

  init(board) {
    const boardSide = Math.min(this.canvas.clientHeight, this.canvas.clientWidth);
    const horizontalOffset = this.canvas.clientHeight < this.canvas.clientWidth ? Math.floor((this.canvas.clientWidth - this.canvas.clientHeight) / 2) : 0;
    const verticalOffset = this.canvas.clientHeight > this.canvas.clientWidth ? Math.floor((this.canvas.clientHeight - this.canvas.clientWidth) / 2) : 0;
    this.board = new Board(board, this.ctx, this.onMove, boardSide, horizontalOffset, verticalOffset);
  }

  updateBoard(board) {
    if (this.board) {
      this.board.update(board);
    }

    this.draw();
  }

  registerDragStart(x, y) {
    this.board.dragStart(x, y);
    this.startAnimation();
  }

  registerDragEnd(withMove = true) {
    this.stopAnimation();
    this.board.drop(withMove);
  }

  startAnimation() {
    this.animationStop = setInterval(this.step.bind(this), 2);
  }

  stopAnimation() {
    if (this.animationStop) {
      clearInterval(this.animationStop);
    }
  }

  registerDrag(x, y) {
    if (this.board.isInBounds(x,y)) {
      this.board.drag(x, y);
    } else {
      this.registerDragEnd(false);
    }
  }

  updateLegalMoves(moves) {
    this.board.setLegalMoves(moves);
  }

  updateValidPieces(pieces) {
    this.board.setValidPieces(pieces);
  }

  updateSquaresToHighlight(pieces) {
    this.board.setPiecesToHighlight(pieces);
  }

  draw() {
    this.board.draw();
  }

  step() {
    this.board.clear();
    this.board.draw();
  }
}

import Square from './square';
import Piece from './piece';

export default class Board {
  constructor(board, ctx, onMove, sideLength, horizontalOffset, verticalOffset) {
    this.board = board;
    this.ctx = ctx;
    this.xOffset = horizontalOffset;
    this.yOffset = verticalOffset;
    this.onMove = onMove;
    this.height= sideLength;
    this.width = sideLength;
    this.validTargetSquares = new Set();
    this.initializeBoard();
  }

  dragStart(x, y) {
    const xPos = x - this.xOffset;
    const yPos = y - this.yOffset;
    if (xPos < this.width && yPos < this.height) {
      const draggedPiece = this.getSquareFromPos(xPos, yPos);
      if (this.validTargetSquares.has(draggedPiece)) {
        this.onMove(this.isDragging, draggedPiece);
      } else {
        this.isDragging = draggedPiece;
        const piece = this.pieces.find(piece => piece.pos === draggedPiece);
        if (piece) {
          const pieceCenter = { x: piece.xOffset + (piece.width / 2), y: piece.yOffset + (piece.height / 2) };
          this.dragOffset = { x: x - pieceCenter.x, y: y - pieceCenter.y };
        }
        this.validTargetSquares = this.legalMoves ? new Set(this.legalMoves.filter(move => {
          return Number(move.split('-')[0]) === this.isDragging;
        }).map(move => Number(move.split('-')[1]))) : new Set();
      }      
    }
  }
  
  drag(x, y) {
    if (this.validPieces && this.validPieces.find(piece => Number(piece) === this.isDragging)) {
      this.draggedPos = { x, y };
    }
  }

  getSquareFromPos(x, y) {
    const col = Math.floor((x / this.width) * 10);
    const row = Math.floor((y / this.height) * 10);
    return row * 10 + col;
  }

  drop(withMove) {
    if (this.draggedPos) {
      const { x, y } = this.draggedPos;
      const from = this.isDragging;
      const to = this.getSquareFromPos(x - this.xOffset, y - this.yOffset);
      if (withMove && this.legalMoves.find(move => move === `${from}-${to}`)) {
        this.onMove(from, to);
      }
      this.draggedPos = null;
      this.clear();
      this.draw();
    }
  }

  initializeBoard() {
    const squareSideLength = this.height / 10;
    const pieceOffset = Math.floor(squareSideLength / 6);
    const pieceSideLength = squareSideLength - (pieceOffset * 2);
    this.squares = new Array(100).fill(null).map((square, idx) => {
      const column = idx % 10;
      const row = Math.floor(idx / 10);
      const xOffset = this.xOffset + (column * squareSideLength);
      const yOffset = this.yOffset + (row * squareSideLength);
      return new Square(idx, this.ctx, squareSideLength, xOffset, yOffset);
    })
      .filter(el => Boolean(el));
    this.pieces = new Array(100).fill(null).map((piece, idx) => {
      if (this.board[idx] !== '-' && this.board[idx] !== '0') {
        const xOffset = this.xOffset + ((idx % 10) * squareSideLength);
        const yOffset = this.yOffset + (Math.floor(idx / 10) * squareSideLength);
        return new Piece(this.board[idx], idx, this.ctx, this.onMove, pieceSideLength, xOffset, yOffset, pieceOffset);
      }
    })
      .filter(el => Boolean(el));
  }

  isInBounds(x, y) {
    const heightBuffer = this.height / 15;
    const widthBuffer = this.width / 15;
    return x > this.xOffset + widthBuffer && x < this.xOffset + this.width - widthBuffer && y > this.yOffset + heightBuffer && y < this.yOffset + this.height - heightBuffer;
  }

  update(board) {
    this.board = board;
    this.initializeBoard();
  }

  setLegalMoves(moves) {
    this.legalMoves = moves;
    this.validTargetSquares = new Set();
  }

  setValidPieces(pieces) {
    this.validPieces = pieces;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  getLastMove() {
    const from = Number(`${this.board[107]}${this.board[108]}`);
    const to = Number(`${this.board[109]}${this.board[110]}`);
    return { from, to };
  }

  draw() {
    this.ctx.fillStyle = '#2f2f2f';
    this.ctx.fillRect(this.xOffset, this.yOffset, this.width, this.height);
    
    const { from, to } = this.getLastMove();
    this.squares.forEach(square => {
      const movingFrom = this.isDragging === square.pos;
      const isValidTarget = this.validTargetSquares.has(square.pos);
      const movedFrom = from && from === square.pos;
      const movedTo = to && to === square.pos;
      square.draw(
        movingFrom,
        isValidTarget,
        movedFrom,
        movedTo,
      );
    });
    this.pieces.forEach(piece => piece.draw(this.isDragging, this.draggedPos, this.dragOffset));
  }
}

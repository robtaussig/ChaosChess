export default class Piece {
  public width: any;
  public dragPos: { x: number, y: number };
  public dragOffset: { x: number, y: number };

  constructor(
    public piece: any,
    public pos: any,
    public ctx: any,
    public onMove: any,
    public height: any,
    public xOffset: any,
    public yOffset: any,
    public squareOffset: any,
  ) {
    this.piece = piece;
    this.pos = pos;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.ctx = ctx;
    this.onMove = onMove;
    this.height = height;
    this.width = height;
    this.squareOffset = squareOffset;
  }

  drawPawn() {
    this.ctx.beginPath();
    const center = this.center();
    const bottomLeft = this.bottomLeft();
    const bottomRight = this.bottomRight();
    const xCenter = center.x;
    const yCenter = center.y;
    this.ctx.arc(xCenter, yCenter - this.height / 4, this.height / 4, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(xCenter, yCenter - 5);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRook() {
    this.ctx.beginPath();
    const center = this.center();
    const topLeft = this.topLeft();
    const bottomRight = this.bottomRight();
    const bottomLeft = this.bottomLeft();
    const topRight = this.topRight();
    const moveLength = this.height / 5;
    this.ctx.moveTo(topLeft.x, topLeft.y);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(topRight.x, topRight.y);
    this.ctx.lineTo(topRight.x - moveLength, topRight.y);
    this.ctx.lineTo(topRight.x - moveLength, topRight.y + moveLength);
    this.ctx.lineTo(topRight.x - (moveLength * 2), topRight.y + moveLength);
    this.ctx.lineTo(topRight.x - (moveLength * 2), topRight.y);
    this.ctx.lineTo(topRight.x - (moveLength * 3), topRight.y);
    this.ctx.lineTo(topRight.x - (moveLength * 3), topRight.y + moveLength);
    this.ctx.lineTo(topLeft.x + moveLength, topRight.y + moveLength);
    this.ctx.lineTo(topLeft.x + moveLength, topRight.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawBishop() {
    this.ctx.beginPath();
    const center = this.center();
    const topLeft = this.topLeft();
    const bottomRight = this.bottomRight();
    const bottomLeft = this.bottomLeft();
    const topRight = this.topRight();
    const moveLength = this.height / 5;
    this.ctx.moveTo(center.x, topLeft.y);
    this.ctx.lineTo(topLeft.x, topLeft.y + moveLength);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(topRight.x, topRight.y + moveLength);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawKnight() {
    this.ctx.beginPath();
    const center = this.center();
    const topLeft = this.topLeft();
    const bottomRight = this.bottomRight();
    const bottomLeft = this.bottomLeft();
    const topRight = this.topRight();
    const moveLength = this.height / 5;
    this.ctx.moveTo(topLeft.x, topLeft.y);
    this.ctx.lineTo(bottomLeft.x, center.y + moveLength);
    this.ctx.lineTo(bottomLeft.x + (moveLength * 2), center.y);
    this.ctx.lineTo(bottomLeft.x + (moveLength * 2), bottomLeft.y - moveLength);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y - moveLength);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(topRight.x, topRight.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawQueen() {
    this.ctx.beginPath();
    const center = this.center();
    const topLeft = this.topLeft();
    const bottomRight = this.bottomRight();
    const bottomLeft = this.bottomLeft();
    const topRight = this.topRight();
    const moveLength = this.height / 10;
    this.ctx.moveTo(center.x, topLeft.y);
    this.ctx.lineTo(center.x - moveLength, topLeft.y + (moveLength * 5));
    this.ctx.lineTo(center.x - (moveLength * 3), topLeft.y + moveLength);
    this.ctx.lineTo(center.x - (moveLength * 3), topLeft.y + (moveLength * 7));
    this.ctx.lineTo(topLeft.x, center.y - moveLength);
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(topRight.x, center.y - moveLength);
    this.ctx.lineTo(center.x + (moveLength * 3), topRight.y + (moveLength * 7));
    this.ctx.lineTo(center.x + (moveLength * 3), topRight.y + moveLength);
    this.ctx.lineTo(center.x + moveLength, topRight.y + (moveLength * 5));
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawKing() {
    this.ctx.beginPath();
    const center = this.center();
    const topLeft = this.topLeft();
    const bottomRight = this.bottomRight();
    const bottomLeft = this.bottomLeft();
    const topRight = this.topRight();
    const moveLength = this.height / 8;
    this.ctx.moveTo(center.x - moveLength, topLeft.y);
    this.ctx.lineTo(center.x - moveLength, topLeft.y + moveLength);
    this.ctx.lineTo(center.x - (moveLength * 2), topLeft.y + moveLength);
    this.ctx.lineTo(center.x - (moveLength * 2), topLeft.y + (moveLength * 2));
    this.ctx.lineTo(center.x - moveLength, topLeft.y + (moveLength * 2));
    this.ctx.lineTo(center.x - moveLength, topLeft.y + (moveLength * 3));
    this.ctx.lineTo(bottomLeft.x, topLeft.y + (moveLength * 3));
    this.ctx.lineTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(bottomRight.x, topLeft.y + (moveLength * 3));
    this.ctx.lineTo(center.x + moveLength, topRight.y + (moveLength * 3));
    this.ctx.lineTo(center.x + moveLength, topRight.y + (moveLength * 2));
    this.ctx.lineTo(center.x + (moveLength * 2), topRight.y + (moveLength * 2));
    this.ctx.lineTo(center.x + (moveLength * 2), topRight.y + moveLength);
    this.ctx.lineTo(center.x + moveLength, topRight.y + moveLength);
    this.ctx.lineTo(center.x + moveLength, topRight.y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  draw(
    isDragging: boolean,
    dragPos: { x: number, y: number },
    dragOffset: { x: number, y: number },
  ) {
    if (isDragging === this.pos) {
      this.dragPos = dragPos;
      this.dragOffset = dragOffset;
    } else {
      this.dragPos = null;
    }
    if (this.piece === this.piece.toLowerCase()) {
      this.ctx.fillStyle = '#1B4079';
    } else {
      this.ctx.fillStyle = '#2CA58D';
    }
    
    switch (this.piece.toLowerCase()) {
      case 'p':
        this.drawPawn();
        break;

      case 'r':
        this.drawRook();
        break;

      case 'b':
        this.drawBishop();
        break;

      case 'n':
        this.drawKnight();
        break;

      case 'q':
        this.drawQueen();
        break;

      case 'k':
        this.drawKing();
        break;
    
      default:
        break;
    }
  }

  topLeft() {
    if (this.dragPos) {
      const x = this.dragPos.x - (this.width / 2) + this.squareOffset - this.dragOffset.x;
      const y = this.dragPos.y - (this.height / 2) + this.squareOffset - this.dragOffset.y;
      return { x, y };
    } else {
      const x = this.xOffset + this.squareOffset;
      const y = this.yOffset + this.squareOffset;
      return { x, y };
    }
  }

  topRight() {
    if (this.dragPos) {
      const x = this.dragPos.x + (this.width / 2) + this.squareOffset - this.dragOffset.x;
      const y = this.dragPos.y - (this.height / 2) + this.squareOffset - this.dragOffset.y;
      return { x, y };
    } else {
      const x = this.xOffset + this.squareOffset + this.width;
      const y = this.yOffset + this.squareOffset;
      return { x, y };
    }
  }

  bottomLeft() {
    if (this.dragPos) {
      const x = this.dragPos.x - (this.width / 2) + this.squareOffset - this.dragOffset.x;
      const y = this.dragPos.y + (this.height / 2) + this.squareOffset - this.dragOffset.y;
      return { x, y };
    } else {
      const x = this.xOffset + this.squareOffset;
      const y = this.yOffset + this.squareOffset + this.height;
      return { x, y };
    }
  }

  bottomRight() {
    if (this.dragPos) {
      const x = this.dragPos.x + (this.width / 2) + this.squareOffset - this.dragOffset.x;
      const y = this.dragPos.y + (this.height / 2) + this.squareOffset - this.dragOffset.y;
      return { x, y };
    } else {
      const x = this.xOffset + this.squareOffset + this.width;
      const y = this.yOffset + this.squareOffset + this.height;
      return { x, y };
    }
  }

  center() {
    if (this.dragPos) {
      const x = this.dragPos.x + this.squareOffset - this.dragOffset.x;
      const y = this.dragPos.y + this.squareOffset - this.dragOffset.y;
      return { x, y };
    } else {
      const x = this.xOffset + this.squareOffset + (this.width / 2);
      const y = this.yOffset + this.squareOffset + (this.height / 2);
      return { x, y };
    }
  }
}

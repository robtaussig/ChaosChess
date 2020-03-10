export default class Square {
  constructor(pos, ctx, sideLength, xOffset, yOffset) {
    this.pos = pos;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.ctx = ctx;
    this.height = sideLength;
    this.width = sideLength;
  }

  draw(isSelected, isLegalMove, movedFrom, movedTo) {
    const column = this.pos % 10;
    const row = Math.floor(this.pos / 10);

    if (column > 0 && row > 0 && column < 9 && row < 9) {
      if (isSelected) {
        this.ctx.fillStyle = 'gold';
      } else if ((column + row) % 2) {
        this.ctx.fillStyle = 'gainsboro';
      } else {
        this.ctx.fillStyle = 'white';
      }
    } else {
      this.ctx.fillStyle = 'black';
    }

    if (movedFrom) {
      this.ctx.fillStyle = '#dbad6a';
    } else if (movedTo) {
      this.ctx.fillStyle = '#dbad6a';
    }

    if (isLegalMove) {
      this.ctx.fillStyle = '#b470c3';
    }
    this.ctx.fillRect(this.xOffset, this.yOffset, this.width, this.height);    
  }
}

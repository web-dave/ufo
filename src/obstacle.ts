export class Obstacle {
  private speed = 6;
  private me: '🤛' | '🍪';

  constructor(
    private x: number,
    private y: number,
    private ctx: CanvasRenderingContext2D
  ) {
    this.me = Math.floor(Math.random() * 10) <= 6 ? '🤛' : '🍪';
  }

  draw() {
    this.ctx.font = '62px Arial';
    this.ctx.fillText(this.me, this.x, this.y);
  }
  update() {
    this.x -= this.speed;
    this.draw();
    return this.x >= -50;
  }

  hit(x: number, y: number): boolean | '🤛' | '🍪' {
    if (
      x >= this.x - 31 &&
      x <= this.x + 31 &&
      y >= this.y - 31 &&
      y <= this.y + 31
    ) {
      return this.me;
    }
    return false;
  }
}

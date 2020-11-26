export class Ufo {
  private width = 15;
  private gravity = 0.6;
  private lift = -15;
  private velocity = -1;
  private me = '🛸';

  constructor(
    public x: number,
    public y: number,
    private ctx: CanvasRenderingContext2D,
    private height: number
  ) {}

  draw() {
    this.ctx.font = '62px Arial';
    this.ctx.fillText(this.me, this.x, this.y);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y >= this.height - this.width) {
      this.y = this.height - this.width;
      this.velocity = 0;
    }

    if (this.y <= this.width) {
      this.y = this.width;
      this.velocity = 0;
    }
    this.draw();
  }
}

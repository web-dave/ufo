import { Subject, fromEvent, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Obstacle } from './obstacle';
import { Ufo } from './ufo';

export class Game {
  private ufo: Ufo;
  private obstacles: Obstacle[] = [];
  public end$ = new Subject();
  public score = 0;
  private tick$ = interval(20).pipe(takeUntil(this.end$));
  private drop$ = interval(1500).pipe(takeUntil(this.end$));
  private jump$ = fromEvent(document.querySelector('body'), 'keydown').pipe(
    takeUntil(this.end$)
  );

  constructor(
    private height: number,
    private width: number,
    private ctx: CanvasRenderingContext2D
  ) {
    this.jump$.subscribe((data) => this.ufo.up());
    this.ufo = new Ufo(50, this.height / 2, this.ctx, this.height);
    this.drop$.subscribe(() =>
      this.obstacles.push(
        new Obstacle(
          this.width,
          Math.floor(Math.random() * this.height) + 1,
          this.ctx
        )
      )
    );

    this.tick$.subscribe(() => this.draw());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ufo.update();
    for (let c = 0; c < this.obstacles.length; c++) {
      const isHit = this.obstacles[c].hit(this.ufo.x, this.ufo.y);
      if (isHit === '🤛') {
        this.end$.next(1);
      } else if (isHit === '🍪') {
        this.score++;
        this.obstacles.splice(c, 1);
        c--;
        break;
      }
      if (!this.obstacles[c].update()) {
        this.obstacles.splice(c, 1);
        c--;
        break;
      }
    }
  }
}

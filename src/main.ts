import { Game } from './game';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const height = innerHeight - 150;
const width = innerWidth - 5;
const canvas = document.querySelector('canvas');
const time = document.querySelector('.time');
const points = document.querySelector('.points');
const context = canvas.getContext('2d');
canvas.height = height;
canvas.width = width;
const game = new Game(height, width, context);
interval(1000).pipe(takeUntil(game.end$)).subscribe(data =>{
    time.innerHTML = 'Time: ' + data + 's.'
    points.innerHTML = 'Points: ' + game.score
});


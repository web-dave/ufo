import { Game } from './game';

const height = innerHeight - 5;
const width = innerWidth - 5;
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.height = height;
canvas.width = width;

const game = new Game(height, width, context);

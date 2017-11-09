import SimpleDraw from './Base/SimpleDraw.js';

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');
const singlePointDraw = new SimpleDraw($canvas);

singlePointDraw.paint();
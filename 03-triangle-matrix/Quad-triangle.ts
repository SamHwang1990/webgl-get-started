import QuadBase from './Base/QuadBase.js';

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');

new QuadBase($canvas).paint();
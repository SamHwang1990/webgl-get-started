import TriangleBase from './Base/TriangleBase.js';

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');

new TriangleBase($canvas).paint();
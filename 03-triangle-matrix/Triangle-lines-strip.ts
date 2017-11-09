import TriangleBase from './Base/TriangleBase.js';

class TriangleLinesStrip extends TriangleBase {
    get DRAW_TYPE() {
        return this.gl.LINE_STRIP;
    }
}

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');
new TriangleLinesStrip($canvas).paint();
import TriangleBase from './Base/TriangleBase.js';

class TriangleLinesLoop extends TriangleBase {
    get DRAW_TYPE() {
        return this.gl.LINE_LOOP;
    }
}

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');
new TriangleLinesLoop($canvas).paint();
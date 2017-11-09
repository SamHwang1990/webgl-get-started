import TriangleBase from './Base/TriangleBase.js';
class TriangleLinesStrip extends TriangleBase {
    get DRAW_TYPE() {
        return this.gl.LINE_STRIP;
    }
}
const $canvas = document.getElementById('webgl');
new TriangleLinesStrip($canvas).paint();

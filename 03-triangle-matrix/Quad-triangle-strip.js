import QuadBase from './Base/QuadBase.js';
class QuadTriangleStrip extends QuadBase {
    get DRAW_TYPE() {
        return this.gl.TRIANGLE_STRIP;
    }
}
const $canvas = document.getElementById('webgl');
new QuadTriangleStrip($canvas).paint();

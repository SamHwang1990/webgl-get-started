import QuadBase from './Base/QuadBase.js';
class QuadTriangleFan extends QuadBase {
    get DRAW_TYPE() {
        return this.gl.TRIANGLE_FAN;
    }
}
const $canvas = document.getElementById('webgl');
new QuadTriangleFan($canvas).paint();

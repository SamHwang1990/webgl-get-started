import TriangleBase from './Base/TriangleBase.js';
class TranslatedTriangle extends TriangleBase {
    constructor($canvas, x, y) {
        super($canvas);
        this.deltaX = x;
        this.deltaY = y;
    }
    get VSHADER_SOURCE() {
        return `
            attribute vec4 a_Position;
            uniform vec4 u_Translation;
            void main() {
                gl_Position = a_Position + u_Translation;
            }
        `;
    }
    get DRAW_TYPE() {
        return this.gl.TRIANGLES;
    }
    beforePaint() {
        const numbers = super.beforePaint();
        const gl = this.gl;
        const u_Translation = gl.getUniformLocation(this.program, 'u_Translation');
        if (!u_Translation) {
            throw new Error('Failed to get webgl uniform location: u_Translation');
        }
        gl.uniform4fv(u_Translation, [this.deltaX, this.deltaY, 0.0, 0.0]);
        return numbers;
    }
}
const $canvas = document.getElementById('webgl');
new TranslatedTriangle($canvas, .2, .2).paint();

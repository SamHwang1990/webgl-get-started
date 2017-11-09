import TriangleBase from './Base/TriangleBase.js';
class MatrixScaledTriangle extends TriangleBase {
    constructor($canvas, sx, sy) {
        super($canvas);
        this.sx = sx;
        this.sy = sy;
    }
    get DRAW_TYPE() {
        return this.gl.TRIANGLES;
    }
    get VSHADER_SOURCE() {
        return `
            attribute vec4 a_Position;
            uniform mat4 u_xScaledMatrix;
            void main() {
                gl_Position = u_xScaledMatrix * a_Position;
            }
        `;
    }
    beforePaint() {
        const numbers = super.beforePaint();
        const gl = this.gl;
        const u_xScaledMatrix = gl.getUniformLocation(this.program, 'u_xScaledMatrix');
        if (!u_xScaledMatrix) {
            throw new Error('Failed to get webgl uniform location: u_xScaledMatrix');
        }
        const xScaledMatrix = new Float32Array([
            this.sx, 0.0, 0.0, 0.0,
            0.0, this.sy, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        gl.uniformMatrix4fv(u_xScaledMatrix, false, xScaledMatrix);
        return numbers;
    }
}
const $canvas = document.getElementById('webgl');
new MatrixScaledTriangle($canvas, 1.2, 1.5).paint();

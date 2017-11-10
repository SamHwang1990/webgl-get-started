import TriangleBase from './Base/TriangleBase.js';
class RotatedTriangle extends TriangleBase {
    constructor($canvas, angle) {
        super($canvas);
        this.angle = angle;
    }
    get VSHADER_SOURCE() {
        return `
            attribute vec4 a_Position;
            uniform float u_CosB, u_SinB;
            void main() {
                gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
                gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
                gl_Position.z = a_Position.z;
                gl_Position.w = 1.0;
            }
        `;
    }
    get DRAW_TYPE() {
        return this.gl.TRIANGLES;
    }
    beforePaint() {
        const numbers = super.beforePaint();
        const gl = this.gl;
        const u_CosB = gl.getUniformLocation(this.program, 'u_CosB');
        if (!u_CosB) {
            throw new Error('Failed to get webgl uniform location: u_CosB');
        }
        const u_SinB = gl.getUniformLocation(this.program, 'u_SinB');
        if (!u_SinB) {
            throw new Error('Failed to get webgl uniform location: u_SinB');
        }
        const radian = Math.PI * this.angle / 180.0;
        gl.uniform1f(u_CosB, Math.cos(radian));
        gl.uniform1f(u_SinB, Math.sin(radian));
        return numbers;
    }
}
const $canvas = document.getElementById('webgl');
new RotatedTriangle($canvas, 90).paint();

import TriangleBase from './Base/TriangleBase.js';

class MatrixRotatedTriangle extends TriangleBase {
    angle: number;
    
    constructor($canvas: HTMLCanvasElement, angle: number) {
        super($canvas);
        
        this.angle = angle;
    }

    get DRAW_TYPE(): number {
        return this.gl.TRIANGLES;
    }

    get VSHADER_SOURCE(): string {
        return `
            attribute vec4 a_Position;
            uniform mat4 u_xRotateMatrix;
            void main() {
                gl_Position = u_xRotateMatrix * a_Position;
            }
        `;
    }

    beforePaint(): number {
        const numbers = super.beforePaint();

        const gl = this.gl;

        const u_xRotatedMatrix = gl.getUniformLocation(this.program, 'u_xRotateMatrix');

        if (!u_xRotatedMatrix) {
            throw new Error('Failed to get webgl uniform location: u_xRotatedMatrix');
        }

        const radian = Math.PI * this.angle / 180.0;
        const cos = Math.cos(radian), sin = Math.sin(radian);

        const xRotatedMatrix = new Float32Array([
            cos, -sin, 0.0, 0.0,
            sin, cos, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);

        gl.uniformMatrix4fv(u_xRotatedMatrix, false, xRotatedMatrix);

        return numbers;
    } 
}

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');
new MatrixRotatedTriangle($canvas, 90).paint();
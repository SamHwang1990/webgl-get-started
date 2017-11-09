import TriangleBase from './Base/TriangleBase.js';

class TranslatedTriangle extends TriangleBase {
    deltaX: number;
    deltaY: number;
    constructor($canvas: HTMLCanvasElement, x: number, y: number) {
        super($canvas);
        this.deltaX = x;
        this.deltaY = y;
    }
    get VSHADER_SOURCE(): string {
        return `
            attribute vec4 a_Position;
            uniform vec4 u_Translation;
            void main() {
                gl_Position = a_Position + u_Translation;
            }
        `;
    }
    get DRAW_TYPE(): number {
        return this.gl.TRIANGLES;
    }
    beforePaint(): number {
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

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');
new TranslatedTriangle($canvas, .2, .2).paint();
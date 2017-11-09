import SimpleDraw from './SimpleDraw.js';

export default class TriangleBase extends SimpleDraw {
    get VSHADER_SOURCE() {
        return `
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
            }
        `;
    }

    /**
     * LINES 模式
     * 每两个顶点连线，若顶点数为奇数，多出的一个顶点会被忽略
     */
    get DRAW_TYPE() {
        return this.gl.LINES;
    }

    beforePaint(): number {
        return this.initVertexBuffers();
    }

    initVertexBuffers(): number {
        const gl = this.gl;

        const vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            throw new Error('Failed to create webgl buffer');
        }

        const vertics = new Float32Array([
            0, .5,
            -.5, -.5,
            .5, -.5,
        ]);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertics, gl.STATIC_DRAW);

        const a_Position = gl.getAttribLocation(this.program, 'a_Position');
        if (a_Position < 0) {
            throw new Error('Failed to get webgl attribute: a_Position');
        }

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        const n = 3
        return n;
    }
}
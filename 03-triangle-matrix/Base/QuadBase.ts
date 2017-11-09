import TriangleBase from './TriangleBase.js';

export default class QuadBase extends TriangleBase {
    get DRAW_TYPE() {
        return this.gl.TRIANGLES;
    }
    initVertexBuffers(): number {
        const gl = this.gl;
        
        const vertexBuffer = gl.createBuffer();

        if (!vertexBuffer) {
            throw new Error('Failed to create webgl attrib location: a_Position b;uffer');
        }

        const vertics = new Float32Array([
            .5, .5,
            -.5, .5,
            -.5, -.5,
            .5, -.5
        ]);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertics, gl.STREAM_DRAW);

        const a_Position = gl.getAttribLocation(this.program, 'a_Position');
        if (a_Position < 0) {
            throw new Error('Failed to get webgl attrib location: a_Position');
        }

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return 4;
    }
}
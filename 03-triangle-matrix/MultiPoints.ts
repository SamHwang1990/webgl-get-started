import SimpleDraw from './Base/SimpleDraw.js';

const $canvas = <HTMLCanvasElement> document.getElementById('webgl');

class MultiPointDraw extends SimpleDraw {
    constructor($canvas: HTMLCanvasElement) {
        super($canvas);
    }
    
    beforePaint(): number {
        return this.initVertexBuffers();
    }

    initVertexBuffers(): number {
        const vertics = new Float32Array([
            0, .5,
            .5, -.5,
            -.5, -.5
        ]);

        const n = 3;

        const gl = this.gl;

        const vertexBuffer = gl.createBuffer();

        if (!vertexBuffer) {
            throw new Error('Failed to create the webgl buffer object');
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertics, gl.STATIC_DRAW);

        const a_Position = gl.getAttribLocation(this.program, 'a_Position');
        if (a_Position < 0) {
            throw new Error(`Failed to get webgl attribute: a_Position`);
        }

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return n;
    }
}

const draw = new MultiPointDraw($canvas);
draw.paint();
import WebGLDrawInterface from './WebGLDrawInterface.js';

export default class SimpleDraw implements WebGLDrawInterface {
    $canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    program: WebGLProgram;

    constructor($canvas: HTMLCanvasElement) {
        this.$canvas = $canvas;
        this.gl = $canvas.getContext('webgl');
    }

    get VSHADER_SOURCE() {
        return `
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 10.0;
        }
        `;
    }

    get FSHADER_SOURCE() {
        return `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
        `;
    }

    get CLEAR_COLOR() {
        return [0.0, 0.0, 0.0, 1.0];
    }

    get DRAW_TYPE() {
        return this.gl.POINTS;
    }

    createShader(shaderSource: string, type: number): WebGLShader {
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const err = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);
            throw new Error(`failed to create WebGLShader: ${err}`);
        }

        return shader;
    }

    createVertexShader(): WebGLShader {
        return this.createShader(this.VSHADER_SOURCE, this.gl.VERTEX_SHADER);
    }

    createFragShader(): WebGLShader {
        return this.createShader(this.FSHADER_SOURCE, this.gl.FRAGMENT_SHADER);
    }

    createProgram(): WebGLProgram {
        const program = this.gl.createProgram();

        if (program == null) {
            throw new Error('failed to create WebGLProgram');
        }

        const vertexShader = this.createVertexShader();
        const fragShader = this.createFragShader();

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragShader);

        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const err = this.gl.getProgramInfoLog(program);

            this.gl.deleteProgram(program);
            this.gl.deleteShader(vertexShader);
            this.gl.deleteShader(fragShader);

            throw new Error(`failed to link WebGLProgram: ${err}`);
        }

        return program;
    }

    beforePaint(): number {
        return 1;
    }

    paint() {
        this.program = this.createProgram();

        this.gl.useProgram(this.program);

        const pointCount = this.beforePaint();

        this.gl.clearColor.apply(this.gl, this.CLEAR_COLOR);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.DRAW_TYPE, 0, pointCount);
    }
}
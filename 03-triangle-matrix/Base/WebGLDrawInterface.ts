export default interface WebGLDrawInterface {
    $canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    program: WebGLProgram;

    VSHADER_SOURCE: string;
    FSHADER_SOURCE: string;

    paint(): void;
    beforePaint(): number;

    createProgram(): WebGLProgram;

    createShader(shaderSource: string, type: number): WebGLShader;
    createVertexShader(): WebGLShader;
    createFragShader(): WebGLShader;

    CLEAR_COLOR: Array<number>;
    DRAW_TYPE: number;
}
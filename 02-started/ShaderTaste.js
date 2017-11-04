/**
 * Created by zhiyuan.huang@ddder.net.
 */

'use strict';

;(function() {
    const $webgl = document.getElementById('canvas');
    const gl = $webgl.getContext('webgl');

    // 定义顶点着色器的内容
    // 通过定义attribute 来从外界接受参数
    const VSHADER_SOURCE = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
        gl_PointSize = 10.0;
    }
    `;

    // 定义片元着色器的内容
    // 通过定义uniform 来从外界接受参数
    const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_fragColor;
    void main() {
        gl_FragColor = u_fragColor;
    }
    `;

    // 根据着色器逻辑，创建并编译一个shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(vertexShader);
        gl.deleteShader(vertexShader);
        throw new Error(`compiler webgl shader failed: ${err}`);
    }

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(fragShader);
        gl.deleteShader(fragShader);
        throw new Error(`compiler webgl shader failed: ${err}`);
    }

    // 创建program 并设置相应着色器
    const program = gl.createProgram();
    if (!program) {
        throw new Error('failed to create webgl program');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = gl.getProgramInfoLog(program);

        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragShader);

        throw new Error(`link webgl program failed: ${err}`);
    }

    gl.useProgram(program);

    // 获取设置的attribute 变量内存地址，
    // 当attribute 变量地址不存在，则返回－1
    const aPosition = gl.getAttribLocation(program, 'a_position');
    if (aPosition < 0) {
        throw new Error('Failed to get the storage location of a_Position');
    }

    // 获取设置的uniform 变量内存地址
    // 当uniform 变量地址不存在，会返回null，注意与attribute 变量的区别
    const uFragColor = gl.getUniformLocation(program, 'u_fragColor');
    if (!uFragColor) {
        throw new Error('Failed to get the storage location of u_fragColor');
    }

    // 设置webgl 所属的<canvas> 执行清空操作时的背景色
    gl.clearColor(0, 0, 0, 1);

    // 触发第一次颜色缓存器的清空
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 记录鼠标点击后生成的webgl point 点和颜色值
    const posArray = [];
    const colorArray = [];

    $webgl.onclick = e => {
        let posX, posY;

        let clickX = e.clientX;
        let clickY = e.clientY;

        let rect = $webgl.getBoundingClientRect();
        posX = (clickX - (rect.left + rect.width)/2) / (rect.width/2);
        posY = -(clickY - (rect.top + rect.height)/2) / (rect.height/2);

        posArray.push([posX, posY]);

        if (posX > 0 && posY > 0)
            colorArray.push([1.0, 0.0, 0.0, 1.0]);
        else if (posX < 0 && posY > 0)
            colorArray.push([0.0, 1.0, 0.0, 1.0]);
        else if (posX < 0 && posY < 0)
            colorArray.push([0.0, 0.0, 1.0, 1.0]);
        else if (posX > 0 && posY < 0)
            colorArray.push([.5, .6, .7, 1.0]);
        else
            colorArray.push([1.0, 1.0, 1.0, 1.0]);

        // TODO: 如果不把所有点重新画一次，会导致背景色变白，需要了解下原因
        gl.clear(gl.COLOR_BUFFER_BIT);
        posArray.forEach((pos, index) => {
            // 设置attribute 变量
            gl.vertexAttrib2fv(aPosition, pos);

            // 设置uniform 变量
            gl.uniform4fv(uFragColor, colorArray[index]);
            gl.drawArrays(gl.POINTS, 0, 1);
        });
    };
})();
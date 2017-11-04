/**
 * Created by zhiyuan.huang@ddder.net.
 */

'use strict';

/**
 * 创建webgl context，并简单设置为黑色背景
 * */
;(function() {
    const $webgl = document.getElementById('canvas');

    // 暂时没考虑浏览器兼容性
    // getContext 支持更多attribute 设置
    const gl = $webgl.getContext('webgl');

    // 设置清空<canvas> 时用的颜色，相当于设置空<canvas> 时的背景色
    gl.clearColor(0, 0, 0, 1);

    // 触发<canvas> 颜色缓存的清空
    gl.clear(gl.COLOR_BUFFER_BIT);
})();
/**
 * Created by zhiyuan.huang@ddder.net.
 */

'use strict';

;(function() {
   const $canvas = document.getElementById('canvas');
   const context = $canvas.getContext('2d');

   context.fillStyle = 'rgba(255, 0, 0, 1)';
   context.fillRect(100, 100, 200, 200);
})();
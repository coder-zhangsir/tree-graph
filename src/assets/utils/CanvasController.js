// 全局变量
let result,
    x = 0,
    y = 0,
    scale = 1,
    isPointerdown = false, // 按下标识
    point = { x: 0, y: 0 }, // 第一个点坐标
    diff = { x: 0, y: 0 }, // 相对于上一次pointermove移动差值
    lastPointermove = { x: 0, y: 0 }; // 用于计算diff

// // 图片加载完成后再绑定事件


// 拖拽查看
export function drag() {
    const container = document.querySelector('.draggable');
    // 绑定 pointerdown
    container.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return
        isPointerdown = true;
        container.setPointerCapture(e.pointerId);
        point = { x: e.clientX, y: e.clientY };
        lastPointermove = { x: e.clientX, y: e.clientY };
    });
    // 绑定 pointermove
    container.addEventListener('pointermove', function (e) {
        if (isPointerdown) {
            const current1 = { x: e.clientX, y: e.clientY };
            diff.x = current1.x - lastPointermove.x;
            diff.y = current1.y - lastPointermove.y;
            lastPointermove = { x: current1.x, y: current1.y };
            x += diff.x;
            y += diff.y;
            container.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')';
            // log.innerHTML = `x = ${x.toFixed(0)}<br>y = ${y.toFixed(0)}<br>scale = ${scale.toFixed(5)}`;
        }
        e.preventDefault();
    });
    // 绑定 pointerup
    container.addEventListener('pointerup', function (e) {
        if (isPointerdown) {
            isPointerdown = false;
        }
    });
    // 绑定 pointercancel
    container.addEventListener('pointercancel', function (e) {
        if (isPointerdown) {
            isPointerdown = false;
        }
    });
}

export function wheelZoom() {
    const container = document.querySelector('.draggable');
    container.addEventListener('mousewheel', function (e) {
        e.preventDefault();

        var scale = 1.1;
        if (e.deltaY < 0) {
            scale = 0.9;
        }

        var transformOrigin = e.clientX + 'px ' + e.clientY + 'px';

        container.style.transformOrigin = transformOrigin;
        container.style.transform = 'scale(' + scale + ')';
    })
}


export function dragAndZoom() {
    let box = document.querySelector('.draggable');

    let scale = 1;
    // 只负责 在盒子（图片）上放大缩小

    var mouseWheelStatus = true;//这个参数用与防抖控制，因为鼠标滚一下，实际上会被触发几十次，加个50毫秒延时，可以有效阻止

    function onWheel(e) {
        setTimeout(() => {
            if (e.altKey) {
                let thatWidth = box.getBoundingClientRect().width;
                let thatHeight = box.getBoundingClientRect().height;
                // 放大与缩小 的标志
                var delta = e.deltaY > 0 ? -0.1 : 0.1;
                var maxScale = 3, minScale = 0.05;
                var x = e.clientX, y = e.clientY;
                var bound = box.getBoundingClientRect();
                var imgX = x - bound.left, imgY = y - bound.top;
                scale = Math.min(maxScale, Math.max(minScale, scale * (1 + delta)));
                var newWidth = 640 * scale;
                var newHeight = 480 * scale;
                var perX = imgX / thatWidth, perY = imgY / thatHeight;
                resize(newWidth, newHeight, perX, perY);
                e.stopPropagation();
                e.preventDefault();
                mouseWheelStatus = true;
            }
        }, 50);
    }
    box.addEventListener('mousewheel', onWheel, { passive: false })
    var resize = function (width, height, perX, perY) {
        var that = this;
        var boxWarp = box;
        var bound = boxWarp.getBoundingClientRect();
        boxWarp.style.height = width + 'px';
        boxWarp.style.width = width + 'px';
        boxWarp.width = width;
        boxWarp.height = height;
        var style = getComputedStyle(boxWarp);
        var marginLeft = parseFloat(style.marginLeft);
        var marginTop = parseFloat(style.marginTop);
        boxWarp.style.width = width + 'px';
        boxWarp.style.height = height + 'px';
        var newBound = boxWarp.getBoundingClientRect();
        //这段是核心，原理差不多，根据缩放比列来完成图像的位置控制，保证缩放后鼠标还在原地
        boxWarp.style.marginLeft = marginLeft - perX * (newBound.right - bound.right) - (1 - perX) * (newBound.left - bound.left) + 'px';
        boxWarp.style.marginTop = marginTop - perY * (newBound.bottom - bound.bottom) - (1 - perY) * (newBound.top - bound.top) + 'px';
    }
}
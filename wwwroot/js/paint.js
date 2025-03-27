let canvas;
let ctx;
let bufferCanvas;
let bufferCtx;
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let currentWidth = 5;
let startX = 0;
let startY = 0;
let lastDrawTime = 0;
const RAF_THROTTLE = 1000 / 60; // 60fps

function initCanvas(canvasElement) {
    try {
        // Main canvas setup
        canvas = canvasElement;
        ctx = canvas.getContext('2d', { alpha: false });
        
        // Buffer canvas setup
        bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = canvas.width;
        bufferCanvas.height = canvas.height;
        bufferCtx = bufferCanvas.getContext('2d', { alpha: false });
        
        // Set initial states
        [ctx, bufferCtx].forEach(context => {
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
        });

        return true;
    } catch (error) {
        console.error('Error initializing canvas:', error);
        return false;
    }
}

function setCanvasState(context) {
    context.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : currentColor;
    context.lineWidth = currentWidth;
}

function saveState() {
    ctx.drawImage(bufferCanvas, 0, 0);
}

function restoreState() {
    bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
    bufferCtx.drawImage(canvas, 0, 0);
}

function setTool(tool) {
    currentTool = tool;
    return true;
}

function setColor(color) {
    currentColor = color;
    return true;
}

function setWidth(width) {
    currentWidth = width;
    return true;
}

function startDrawing(x, y) {
    try {
        isDrawing = true;
        startX = x;
        startY = y;
        
        setCanvasState(bufferCtx);
        bufferCtx.beginPath();
        bufferCtx.moveTo(x, y);
        
        saveState();
        return true;
    } catch (error) {
        console.error('Error starting drawing:', error);
        return false;
    }
}

function draw(x, y) {
    if (!isDrawing) return false;

    try {
        const now = performance.now();
        if (now - lastDrawTime < RAF_THROTTLE) {
            return false;
        }
        lastDrawTime = now;

        switch (currentTool) {
            case 'pencil':
            case 'eraser':
                bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
                bufferCtx.drawImage(canvas, 0, 0);
                setCanvasState(bufferCtx);
                bufferCtx.beginPath();
                bufferCtx.moveTo(startX, startY);
                bufferCtx.lineTo(x, y);
                bufferCtx.stroke();
                ctx.drawImage(bufferCanvas, 0, 0);
                startX = x;
                startY = y;
                break;

            case 'line':
                bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
                bufferCtx.drawImage(canvas, 0, 0);
                setCanvasState(bufferCtx);
                bufferCtx.beginPath();
                bufferCtx.moveTo(startX, startY);
                bufferCtx.lineTo(x, y);
                bufferCtx.stroke();
                ctx.drawImage(bufferCanvas, 0, 0);
                break;

            case 'rectangle':
                bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
                bufferCtx.drawImage(canvas, 0, 0);
                setCanvasState(bufferCtx);
                const width = x - startX;
                const height = y - startY;
                bufferCtx.beginPath();
                bufferCtx.rect(startX, startY, width, height);
                bufferCtx.stroke();
                ctx.drawImage(bufferCanvas, 0, 0);
                break;

            case 'circle':
                bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
                bufferCtx.drawImage(canvas, 0, 0);
                setCanvasState(bufferCtx);
                const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                bufferCtx.beginPath();
                bufferCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
                bufferCtx.stroke();
                ctx.drawImage(bufferCanvas, 0, 0);
                break;
        }
        return true;
    } catch (error) {
        console.error('Error drawing:', error);
        return false;
    }
}

function stopDrawing() {
    try {
        if (!isDrawing) return false;
        isDrawing = false;
        saveState();
        return true;
    } catch (error) {
        console.error('Error stopping drawing:', error);
        return false;
    }
}

function clearCanvas() {
    try {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        bufferCtx.fillStyle = 'white';
        bufferCtx.fillRect(0, 0, canvas.width, canvas.height);
        return true;
    } catch (error) {
        console.error('Error clearing canvas:', error);
        return false;
    }
}

function getCanvasImage() {
    try {
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('Error getting canvas image:', error);
        return null;
    }
}

// Export the API
window.paintApp = {
    initCanvas,
    setTool,
    setColor,
    setWidth,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getCanvasImage
};
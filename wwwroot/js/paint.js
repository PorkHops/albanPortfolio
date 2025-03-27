let canvas;
let ctx;
let bufferCanvas;
let bufferCtx;
let isDrawing = false;
let currentTool = 'circle';
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
        // Clear the buffer and copy the main canvas state
        bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
        bufferCtx.drawImage(canvas, 0, 0);
        setCanvasState(bufferCtx);

        switch (currentTool) {
            case 'pencil':
            case 'eraser':
                // For freehand drawing, draw directly to main canvas
                setCanvasState(ctx);
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(x, y);
                ctx.stroke();
                startX = x;
                startY = y;
                return true;

            case 'line':
                bufferCtx.beginPath();
                bufferCtx.moveTo(startX, startY);
                bufferCtx.lineTo(x, y);
                bufferCtx.stroke();
                break;

            case 'rectangle':
                const width = x - startX;
                const height = y - startY;
                bufferCtx.beginPath();
                bufferCtx.rect(startX, startY, width, height);
                bufferCtx.stroke();
                break;

            case 'circle':
                const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                bufferCtx.beginPath();
                bufferCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
                bufferCtx.stroke();
                break;
        }

        // Only update main canvas for shape tools
        if (currentTool !== 'pencil' && currentTool !== 'eraser') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bufferCanvas, 0, 0);
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
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `drawing-${new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
    } catch (error) {
        console.error('Error getting canvas image:', error);
        return false;
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
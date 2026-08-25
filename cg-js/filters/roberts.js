// Função auxiliar interna para converter cor RGBA em valor único de cinza
function getGrayValue(pixel) {
    return 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;
}

// Algoritmo de Detecção de Bordas usando o Operador de Roberts
function robertsEdgeDetection(ctxOrig, ctxDest, width, height) {
    const imgOrig = new CGImage(ctxOrig, width, height);
    const imgDest = new CGImage(null, width, height);

    // Percorre até (width - 1) e (height - 1) pois lemos a vizinhança (x+1, y+1)
    for (let y = 0; y < height - 1; y++) {
        for (let x = 0; x < width - 1; x++) {
            
            // 1. Leitura da vizinhança 2x2 em tom de cinza
            // A = P(x, y)       B = P(x+1, y)
            // C = P(x, y+1)     D = P(x+1, y+1)
            const a = getGrayValue(imgOrig.getPixel(x, y));
            const b = getGrayValue(imgOrig.getPixel(x + 1, y));
            const c = getGrayValue(imgOrig.getPixel(x, y + 1));
            const d = getGrayValue(imgOrig.getPixel(x + 1, y + 1));

            // 2. Gradients nas diagonais
            const gx = d - a;
            const gy = b - c;

            // 3. Magnitude do Gradiente (aproximação por valor absoluto)
            let g = Math.abs(gx) + Math.abs(gy);

            // 4. Truncamento (Saturação em 255)
            if (g > 255) g = 255;

            // 5. Escrita no pixel de destino
            const edgeColor = { r: g, g: g, b: g, a: 255 };
            imgDest.setPixel(x, y, edgeColor);
        }
    }

    ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DE INTERFACE E EVENTOS
const inputUpload = document.getElementById('upload');
const btnProcess = document.getElementById('btnProcess');

const canvasOrig = document.getElementById('canvasOrig');
const canvasDest = document.getElementById('canvasDest');
const ctxOrig = canvasOrig.getContext('2d');
const ctxDest = canvasDest.getContext('2d');

let loadedImage = null;

inputUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        loadedImage = img;
        canvasOrig.width = img.width;
        canvasOrig.height = img.height;
        ctxOrig.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(file);
});

btnProcess.addEventListener('click', () => {
    if (!loadedImage) {
        alert("Carregue uma imagem primeiro.");
        return;
    }

    const w = loadedImage.width;
    const h = loadedImage.height;

    canvasDest.width = w;
    canvasDest.height = h;

    robertsEdgeDetection(ctxOrig, ctxDest, w, h);
});

// Exibe a função no PrismJS
showFunction(robertsEdgeDetection);
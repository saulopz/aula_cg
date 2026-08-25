// Algoritmo de Binarização por Limiarização
function applyThreshold(ctxOrig, ctxDest, width, height, threshold) {
    const imgOrig = new CGImage(ctxOrig, width, height);
    const imgDest = new CGImage(null, width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            
            // 1. Leitura do pixel original
            const pixel = imgOrig.getPixel(x, y);

            // 2. Converte para tom de cinza (Luminância)
            const gray = 0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b;

            // 3. Separação pelo limiar (Thresholding)
            const binaryColorValue = (gray < threshold) ? 0 : 255;

            // 4. Monta a cor binarizada (Preto ou Branco)
            const binaryColor = {
                r: binaryColorValue,
                g: binaryColorValue,
                b: binaryColorValue,
                a: pixel.a
            };

            // 5. Escreve no destino
            imgDest.setPixel(x, y, binaryColor);
        }
    }

    ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DA INTERFACE E EVENTOS EM TEMPO REAL
const inputUpload = document.getElementById('upload');
const inputThreshold = document.getElementById('threshold');
const thresholdVal = document.getElementById('thresholdVal');

const canvasOrig = document.getElementById('canvasOrig');
const canvasDest = document.getElementById('canvasDest');
const ctxOrig = canvasOrig.getContext('2d');
const ctxDest = canvasDest.getContext('2d');

let loadedImage = null;

// Executa o reprocessamento sempre que o controle mudar
function process() {
    if (!loadedImage) return;

    const w = loadedImage.width;
    const h = loadedImage.height;
    const threshold = parseInt(inputThreshold.value, 10);

    // Atualiza o texto do valor do limiar na tela
    thresholdVal.textContent = threshold;

    canvasDest.width = w;
    canvasDest.height = h;

    applyThreshold(ctxOrig, ctxDest, w, h, threshold);
}

inputUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        loadedImage = img;
        canvasOrig.width = img.width;
        canvasOrig.height = img.height;
        ctxOrig.drawImage(img, 0, 0);
        process(); // Executa ao carregar
    };
    img.src = URL.createObjectURL(file);
});

// Evento 'input' dispara continuamente enquanto o aluno arrasta o slider
inputThreshold.addEventListener('input', process);

// Exibe o código-fonte da função no PrismJS
showFunction(applyThreshold);
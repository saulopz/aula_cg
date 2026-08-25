// Retorna a coordenada equivalente na imagem original
function getOrigXY(xDest, yDest, scale) {
    const x = Math.floor(xDest / scale);
    const y = Math.floor(yDest / scale);
    return { x, y };
}

// Algoritmo de Redimensionamento usando a nossa CGImage
function resizeImage(ctxOrig, ctxDest, origW, origH, destW, destH, scale) {
    // Instancia os leitores/escritores de imagem
    const imgOrig = new CGImage(ctxOrig, origW, origH);
    const imgDest = new CGImage(null, destW, destH); // Novo buffer em branco

    // Laço direto na imagem de destino
    for (let y = 0; y < destH; y++) {
        for (let x = 0; x < destW; x++) {
            
            // 1. Mapeamento reverso
            const orig = getOrigXY(x, y, scale);

            // 2. Leitura da cor na imagem original
            const color = imgOrig.getPixel(orig.x, orig.y);

            // 3. Escrita da cor na imagem de destino
            imgDest.setPixel(x, y, color);
        }
    }

    // Transfere o buffer processado para o canvas de destino
    ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DE EVENTOS DA INTERFACE
const inputUpload = document.getElementById('upload');
const inputProportion = document.getElementById('proportion');
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

    const proportion = parseFloat(inputProportion.value);
    const scale = proportion / 100;

    const destW = Math.round(loadedImage.width * scale);
    const destH = Math.round(loadedImage.height * scale);

    canvasDest.width = destW;
    canvasDest.height = destH;

    resizeImage(ctxOrig, ctxDest, loadedImage.width, loadedImage.height, destW, destH, scale);
});

showFunction(resizeImage);

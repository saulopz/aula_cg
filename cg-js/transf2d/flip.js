// Retorna a coordenada X correspondente na imagem original (Mapeamento Reverso)
function getOrigX(xDest, width) {
    return (width - 1) - xDest;
}

// Algoritmo de Espelhamento Horizontal
function flipHorizontal(ctxOrig, ctxDest, width, height) {
    const imgOrig = new CGImage(ctxOrig, width, height);
    const imgDest = new CGImage(null, width, height);

    // Percorre a imagem de destino
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            
            // 1. Calcula qual x da imagem original corresponde ao x atual do destino
            const origX = getOrigX(x, width);

            // 2. Leitura da cor na origem (o y permanece inalterado)
            const color = imgOrig.getPixel(origX, y);

            // 3. Escrita no destino
            imgDest.setPixel(x, y, color);
        }
    }

    // Atualiza a renderização do canvas
    ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DA INTERFACE
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

    flipHorizontal(ctxOrig, ctxDest, w, h);
});

showFunction(flipHorizontal);
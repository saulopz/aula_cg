// Rotaciona um ponto (x, y) por um ângulo radiano
function rotatePoint(x, y, rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
        x: x * cos - y * sin,
        y: x * sin + y * cos
    };
}

// Calcula as dimensões do novo canvas para não cortar a imagem rotacionada
function getRotatedSize(width, height, rad) {
    const cx = width / 2;
    const cy = height / 2;

    // Os 4 vértices relativos ao centro
    const corners = [
        rotatePoint(-cx, -cy, rad),
        rotatePoint(cx, -cy, rad),
        rotatePoint(cx, cy, rad),
        rotatePoint(-cx, cy, rad)
    ];

    const xs = corners.map(p => p.x);
    const ys = corners.map(p => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
    };
}

// Algoritmo de Rotação por Mapeamento Reverso
function rotateImage(ctxOrig, ctxDest, origW, origH, destW, destH, angleDegrees) {
    const imgOrig = new CGImage(ctxOrig, origW, origH);
    const imgDest = new CGImage(null, destW, destH);

    // Converte o ângulo para radianos (sinal negativo para rotação no sentido anti-horário)
    const rad = (angleDegrees * Math.PI) / 180;
    
    // Pré-calcula os centros
    const origCx = origW / 2;
    const origCy = origH / 2;
    const destCx = destW / 2;
    const destCy = destH / 2;

    const cos = Math.cos(-rad); // Ângulo inverso para mapeamento reverso
    const sin = Math.sin(-rad);

    // Percorre todos os pixels do DESTINO (garante imagem contínua)
    for (let y = 0; y < destH; y++) {
        for (let x = 0; x < destW; x++) {
            
            // 1. Translada a coordenada do destino para o centro local
            const dx = x - destCx;
            const dy = y - destCy;

            // 2. Aplica a rotação inversa
            const rx = dx * cos - dy * sin;
            const ry = dx * sin + dy * cos;

            // 3. Translada de volta para o sistema do canvas original
            const origX = Math.round(rx + origCx);
            const origY = Math.round(ry + origCy);

            // 4. Copia o pixel se estiver dentro dos limites da imagem original
            if (origX >= 0 && origX < origW && origY >= 0 && origY < origH) {
                const color = imgOrig.getPixel(origX, origY);
                imgDest.setPixel(x, y, color);
            }
        }
    }

    ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DE EVENTOS DA INTERFACE
const inputUpload = document.getElementById('upload');
const inputAngle = document.getElementById('angle');
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

    const angle = parseFloat(inputAngle.value);
    const rad = (angle * Math.PI) / 180;

    const origW = loadedImage.width;
    const origH = loadedImage.height;

    // Redimensiona o canvas de destino para acomodar a imagem girada
    const newSize = getRotatedSize(origW, origH, rad);
    canvasDest.width = newSize.width;
    canvasDest.height = newSize.height;

    rotateImage(ctxOrig, ctxDest, origW, origH, newSize.width, newSize.height, angle);
});

showFunction(rotateImage);
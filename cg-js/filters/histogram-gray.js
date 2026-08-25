// Algoritmo de Cálculo e Plotagem do Histograma
function computeHistogram(ctxOrig, ctxHist, width, height) {
    const imgOrig = new CGImage(ctxOrig, width, height);

    // 1. Inicializa o vetor de frequências com 256 posições zeradas
    const histogram = new Array(256).fill(0);

    // 2. Acumula a frequência de cada tom de cinza
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixel = imgOrig.getPixel(x, y);
            const gray = Math.round(0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b);
            histogram[gray]++;
        }
    }

    // 3. Renderiza o gráfico do histograma no canvas de destino
    drawHistogram(ctxHist, histogram);
}

// Função utilitária para desenhar o gráfico (normalizado para a altura do canvas)
function drawHistogram(ctxHist, histogram) {
    const hWidth = ctxHist.canvas.width;
    const hHeight = ctxHist.canvas.height;

    // Encontra a maior frequência para normalizar a escala vertical
    const maxFreq = Math.max(...histogram);

    // Limpa o canvas do gráfico
    ctxHist.fillStyle = "#111111";
    ctxHist.fillRect(0, 0, hWidth, hHeight);

    // Largura de cada barra no canvas (ex: 512px / 256 tons = 2px por tom)
    const barWidth = hWidth / 256;

    // Desenha cada barra do histograma
    for (let i = 0; i < 256; i++) {
        // Normaliza a altura proporcionalmente ao valor máximo
        const barHeight = (histogram[i] / maxFreq) * (hHeight - 20);

        const x = i * barWidth;
        const y = hHeight - barHeight;

        // Desenha a barra com degradê simples de cinza
        ctxHist.fillStyle = `rgb(${i}, ${i}, ${i})`;
        ctxHist.fillRect(x, y, barWidth, barHeight);
    }
}

// INFRAESTRUTURA DA INTERFACE
const inputUpload = document.getElementById('upload');
const btnProcess = document.getElementById('btnProcess');

const canvasOrig = document.getElementById('canvasOrig');
const canvasHist = document.getElementById('canvasHist');
const ctxOrig = canvasOrig.getContext('2d');
const ctxHist = canvasHist.getContext('2d');

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

    computeHistogram(ctxOrig, ctxHist, w, h);
});

// Exibe o algoritmo no PrismJS
showFunction(computeHistogram);
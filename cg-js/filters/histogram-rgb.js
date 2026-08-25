// Algoritmo de Cálculo e Plotagem do Histograma RGB
function computeRGBHistogram(ctxOrig, ctxHist, width, height) {
    const imgOrig = new CGImage(ctxOrig, width, height);

    // 1. Vetores independentes para cada canal de cor
    const rHist = new Array(256).fill(0);
    const gHist = new Array(256).fill(0);
    const bHist = new Array(256).fill(0);

    // 2. Acumula a frequência de cada intensidade por canal
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixel = imgOrig.getPixel(x, y);
            rHist[pixel.r]++;
            gHist[pixel.g]++;
            bHist[pixel.b]++;
        }
    }

    // 3. Renderiza o gráfico multicanal
    drawRGBHistogram(ctxHist, rHist, gHist, bHist);
}

// Função utilitária para desenhar as linhas dos 3 canais no canvas
function drawRGBHistogram(ctxHist, rHist, gHist, bHist) {
    const hWidth = ctxHist.canvas.width;
    const hHeight = ctxHist.canvas.height;

    // Obtém o valor máximo global entre todos os canais para normalização
    const maxFreq = Math.max(...rHist, ...gHist, ...bHist);

    // Fundo do gráfico
    ctxHist.fillStyle = "#111111";
    ctxHist.fillRect(0, 0, hWidth, hHeight);

    const step = hWidth / 255;

    // Sub-rotina para traçar o gráfico de linha de um canal específico
    function drawChannelLine(hist, color) {
        ctxHist.beginPath();
        ctxHist.strokeStyle = color;
        ctxHist.lineWidth = 2;

        for (let i = 0; i < 256; i++) {
            const x = i * step;
            const barHeight = (hist[i] / maxFreq) * (hHeight - 20);
            const y = hHeight - barHeight - 5;

            if (i === 0) {
                ctxHist.moveTo(x, y);
            } else {
                ctxHist.lineTo(x, y);
            }
        }
        ctxHist.stroke();
    }

    // Desenha as três curvas sobrepostas com transparência para visibilidade
    drawChannelLine(rHist, "rgba(255, 85, 85, 0.85)");   // Vermelho
    drawChannelLine(gHist, "rgba(80, 250, 123, 0.85)");  // Verde
    drawChannelLine(bHist, "rgba(139, 233, 253, 0.85)"); // Azul
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

    computeRGBHistogram(ctxOrig, ctxHist, w, h);
});

// Exibe a função principal no PrismJS
showFunction(computeRGBHistogram);
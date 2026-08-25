// Algoritmo de Conversão para Escala de Cinza por Ponderação de Luminância
function convertToGrayscale(ctxOrig, ctxDest, width, height) {
  const imgOrig = new CGImage(ctxOrig, width, height);
  const imgDest = new CGImage(null, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // 1. Leitura do pixel original
      const pixel = imgOrig.getPixel(x, y);

      // 2. Cálculo da luminância (ITU-R BT.601)
      const gray = Math.round(
        0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b,
      );

      // 3. Montagem da nova cor (atribui o mesmo valor para R, G e B)
      const grayColor = {
        r: gray,
        g: gray,
        b: gray,
        a: pixel.a,
      };

      // 4. Escrita na imagem de destino
      imgDest.setPixel(x, y, grayColor);
    }
  }

  ctxDest.putImageData(imgDest.imageData, 0, 0);
}

// INFRAESTRUTURA DA INTERFACE
const inputUpload = document.getElementById("upload");
const btnProcess = document.getElementById("btnProcess");

const canvasOrig = document.getElementById("canvasOrig");
const canvasDest = document.getElementById("canvasDest");
const ctxOrig = canvasOrig.getContext("2d");
const ctxDest = canvasDest.getContext("2d");

let loadedImage = null;

inputUpload.addEventListener("change", (e) => {
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

btnProcess.addEventListener("click", () => {
  if (!loadedImage) {
    alert("Carregue uma imagem primeiro.");
    return;
  }

  const w = loadedImage.width;
  const h = loadedImage.height;

  canvasDest.width = w;
  canvasDest.height = h;

  convertToGrayscale(ctxOrig, ctxDest, w, h);
});

// Exibe a função no PrismJS via nossa função auxiliar
showFunction(convertToGrayscale);

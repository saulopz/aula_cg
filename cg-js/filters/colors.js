// Algoritmo para isolar ou extrair um canal de cor (originalmente verde)
function filterChannel(ctxOrig, ctxDest, width, height) {
  const imgOrig = new CGImage(ctxOrig, width, height);
  const imgDest = new CGImage(null, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = imgOrig.getPixel(x, y);

      const color = {
        r: pixel.g,
        g: 0,
        b: 0,
        a: pixel.a,
      };

      imgDest.setPixel(x, y, color);
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

  filterChannel(ctxOrig, ctxDest, w, h);
});

// Exibe a função no PrismJS via nossa função auxiliar
showFunction(filterChannel);

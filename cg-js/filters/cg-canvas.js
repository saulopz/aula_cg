// Wrapper para simplificar o manuseio de buffers de imagem
class CGImage {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    // Carrega o buffer de dados existente ou cria um novo em branco
    this.imageData = ctx
      ? ctx.getImageData(0, 0, width, height)
      : new ImageData(width, height);
    this.pixels = this.imageData.data;
  }

  // Leitura: Retorna a cor {r, g, b, a} na posição (x, y)
  getPixel(x, y) {
    // Proteção contra leitura fora dos limites
    const px = Math.max(0, Math.min(x, this.width - 1));
    const py = Math.max(0, Math.min(y, this.height - 1));

    const index = (py * this.width + px) * 4;
    return {
      r: this.pixels[index],
      g: this.pixels[index + 1],
      b: this.pixels[index + 2],
      a: this.pixels[index + 3],
    };
  }

  // Escrita: Define a cor {r, g, b, a} na posição (x, y)
  setPixel(x, y, color) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

    const index = (y * this.width + x) * 4;
    this.pixels[index] = color.r;
    this.pixels[index + 1] = color.g;
    this.pixels[index + 2] = color.b;
    this.pixels[index + 3] = color.a !== undefined ? color.a : 255;
  }

  // Atualiza o canvas visualmente com os dados alterados
  update() {
    if (this.ctx) {
      this.ctx.putImageData(this.imageData, 0, 0);
    }
  }
}

function showFunction(func) {
  const codeBlock = document.getElementById("codeBlock");
  if (codeBlock && typeof func === "function") {
    codeBlock.textContent = func.toString();
    // Recarrega o highlight do PrismJS
    if (window.Prism) {
      Prism.highlightElement(codeBlock);
    }
  }
}

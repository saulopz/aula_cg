# aula_cg

Códigos de apoio das aulas práticas da disciplina **Computação Gráfica e Realidade Virtual** (Unisul).

Material teórico completo, cronograma e plano de ensino ficam na wiki: [Computação Gráfica](https://wiki.arisa.com.br/index.php?title=Computa%C3%A7%C3%A3o_Gr%C3%A1fica)

## Estrutura do Repositório

O repositório está organizado em duas frentes principais de implementação: JavaScript (web) e Python.

```text
AULA_CG/
├── cg-js/        # Exemplos e atividades em JavaScript (p5.js, Three.js, etc.)
├── cg-python/    # Exemplos e atividades em Python (NumPy, OpenCV, Matplotlib, etc.)
├── .gitignore    # Regras para ignorar arquivos temporários e dependências no Git
├── image.jpg     # Imagem base para testes nos scripts de processamento de imagem
├── LICENSE       # Termos de licença de código aberto do repositório (ex: GPLv3, MIT)
└── README.md     # Documentação principal e instruções de uso do repositório
```

### Módulos JavaScript (`cg-js/`)

| Pasta | Conteúdo | Teoria / Foco |
| --- | --- | --- |
| `filters` | Filtros e Transformações em Imagens Matriciais | Processamento Digital de Imagens |
| `threejs` | Introdução ao Three.js: cena, câmera, primitivas | Renderização 3D Web |
| `threejs2` | Materiais, Texturas e Iluminação | Shading e Mapeamento |
| `threejs3` | Shaders (GLSL) | Programmable Pipeline |
| `threejs4` | Sistemas de Partículas | Efeitos Visuais e Simulação |
| `threejs5` | Animação e Interatividade | Controle de Objetos e Tempo |
| `transf2d` | Transformações Vetoriais no Plano (2D) | Álgebra Linear Aplicada |
| `vect2d` | Vetores no Plano e Geometria Analítica 2D | Geometria Computacional |
| `vect3d` | Perspectiva e Projeção Cônica | Projeções Geométricas |
| `vectrig` | Geometria, Vetores e Trigonometria | Fundamentos Matemáticos |

### Módulos Python (`cg-python/`)

| Pasta | Conteúdo | Teoria / Foco |
| --- | --- | --- |
| `filters` | Processamento de Imagens e Filtros Matriciais | Manipulação de Pixels/Arrays |
| `transf2d` | Operações Matriciais de Transformação 2D | Álgebra Linear |
| `vect2d` | Geometria Vetorial em 2D | Vetores e Matrizes |
| `vect3d` | Espaço Tridimensional e Projeções | Geometria 3D |

---

## Executando os Exemplos

* **JavaScript (`cg-js/`):** A maioria dos exemplos em HTML/JS roda diretamente no navegador. Para exemplos com carregamento de ativos externos (texturas, modelos 3D, shaders), utilize um servidor local HTTP (como a extensão **Live Server** ou **Five Server** no VSCodium/VS Code, ou execute `python -m http.server` no diretório).
* **Python (`cg-python/`):** Certifique-se de ter os pacotes necessários instalados no seu ambiente de desenvolvimento.

---

## Licença

Este projeto é disponibilizado sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes sobre os direitos de cópia, modificação e distribuição de software livre.
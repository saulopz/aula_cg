from __future__ import annotations
import sys
import math
import pygame

# Configuração
TRANSLATE_SPEED: float = 3.0
ROTATE_SPEED: float = 2.0
WIDTH: int = 800
HEIGHT: int = 600
Color_screen: pygame.Color = (255, 255, 255)
Color_line: pygame.Color = (0, 0, 0)
CONICAL: bool = False
DISTANCE: float = 300
FPS: int = 60


# -------------------------
# Classe Point
# -------------------------
class Point:
    def __init__(self, x: float, y: float, z: float):
        self.x: float = x                               # vetor x
        self.y: float = y                               # vetor y
        self.z: float = z                               # vetor z

    def copy(self) -> Point:                            # Cria uma copia do ponto
        return Point(self.x, self.y, self.z)


# -------------------------
# Classe Cube
# -------------------------
class Cube:
    def __init__(self, screen):
        self.screen: pygame.display = screen            # Referencia a screen do pygame
        self.points: list[Point] = [                    # Criacao dos pontos do cubo
            Point(0, 0, 0),
            Point(-50, -50, -50),
            Point(+50, -50, -50),
            Point(+50, +50, -50),
            Point(-50, +50, -50),
            Point(-50, -50, +50),
            Point(+50, -50, +50),
            Point(+50, +50, +50),
            Point(-50, +50, +50),
        ]
        self.translate(0, 0, 300)                        # Move para uma posicao inicial longe da tela

    def translate(self, tx, ty, tz) -> None:             # Translada o cubo
        for p in self.points:                            # Para cada ponto executa a matriz de translacao
            p.x += tx                                    # Soma x a tx
            p.y += ty                                    # Soma y a ty
            p.z += tz                                    # Soma z a tz

    def scale(self, sx, sy, sz) -> None:                 # Executa a escala no cubo
        pivot = self.points[0].copy()                    # Cria uma copia do ponto pivo
        self.translate(-pivot.x, -pivot.y, -pivot.z)     # Translada para a origem com referencia ao pivo
        for p in self.points:                            # Executa a matriz de escala para cada ponto
            p.x *= sx
            p.y *= sy
            p.z *= sz
        self.translate(pivot.x, pivot.y, pivot.z)        # Translada da origem de volta ao pivo original

    def rotate(self, angle, axis):                       # Executa a rotacao do cubo
        angle = math.radians(angle)                      # Converter para radianos
        pivot = self.points[0].copy()                    # Faz uma copia do ponto pivo
        self.translate(-pivot.x, -pivot.y, -pivot.z)     # Translada para a origem com referência ao pivo
        for p in self.points:                            # Executa a matriz de rotacao em cada ponto e cada vetor
            x, y, z = p.x, p.y, p.z
            if axis == "x":
                p.y = y * math.cos(angle) - z * math.sin(angle)
                p.z = z * math.cos(angle) + y * math.sin(angle)
            elif axis == "y":
                p.x = x * math.cos(angle) - z * math.sin(angle)
                p.z = z * math.cos(angle) + x * math.sin(angle)
            elif axis == "z":
                p.x = x * math.cos(angle) - y * math.sin(angle)
                p.y = y * math.cos(angle) + x * math.sin(angle)
        self.translate(pivot.x, pivot.y, pivot.z)

    # Executa visualizacao da projecao conica / perspectiva se ativa
    def perspective(self, p) -> Point:
        if CONICAL and p.z != 0:
            scale = DISTANCE / p.z
            return Point(p.x * scale, p.y * scale, p.z)
        return Point(p.x, p.y, p.z)

    def line(self, p1, p2) -> None:
        pygame.draw.line(self.screen, Color_line, (p1.x, p1.y), (p2.x, p2.y))

    # Desenha o cubo
    def draw(self) -> None:
        p = []
        for i in range(9):
            point = self.perspective(self.points[i])
            point.x += WIDTH / 2
            point.y += HEIGHT / 2
            p.append(point)

        self.line(p[0], p[0])  # draw point over pivot
        for i in range(3):
            self.line(p[i + 1], p[i + 2])
            self.line(p[i + 5], p[i + 5 + 1])
            self.line(p[i + 1], p[i + 5])
        self.line(p[4], p[1])
        self.line(p[8], p[4])
        self.line(p[5], p[8])

    # Cada tecla ainda pressionada aplica sua ação a cada quadro.
    # Diferente da versão anterior, não existe mais uma única variável "move":
    # soltar uma tecla só remove ELA do conjunto, sem afetar as demais.
    def apply_held_keys(self, held_keys: set[int]) -> None:
        if pygame.K_LEFT in held_keys:
            self.translate(-TRANSLATE_SPEED, 0, 0)
        if pygame.K_RIGHT in held_keys:
            self.translate(TRANSLATE_SPEED, 0, 0)
        if pygame.K_UP in held_keys:
            self.translate(0, -TRANSLATE_SPEED, 0)
        if pygame.K_DOWN in held_keys:
            self.translate(0, TRANSLATE_SPEED, 0)
        if pygame.K_q in held_keys:
            self.translate(0, 0, -TRANSLATE_SPEED)
        if pygame.K_e in held_keys:
            self.translate(0, 0, TRANSLATE_SPEED)
        if pygame.K_a in held_keys:
            self.rotate(-ROTATE_SPEED, "y")
        if pygame.K_d in held_keys:
            self.rotate(ROTATE_SPEED, "y")
        if pygame.K_w in held_keys:
            self.rotate(ROTATE_SPEED, "x")
        if pygame.K_s in held_keys:
            self.rotate(-ROTATE_SPEED, "x")
        if pygame.K_z in held_keys:
            self.rotate(-ROTATE_SPEED, "z")
        if pygame.K_x in held_keys:
            self.rotate(ROTATE_SPEED, "z")


def show_help(screen, font):
    help = [
        font.render("ESC: Fecha o programa", True, (200, 200, 200)),
        font.render("A, D: Rotaciona no eixo Y", True, (200, 200, 200)),
        font.render("W, S: Rotaciona no eixo X", True, (200, 200, 200)),
        font.render("Z, X: Rotaciona no eixo Z", True, (200, 200, 200)),
        font.render("Setas ESQUERDA, DIREITA: Translada no eixo X", True, (200, 200, 200)),
        font.render("Setas CIMA, BAIXO: Translada no eixo Y", True, (200, 200, 200)),
        font.render("Q, E: Translada no eixo Z", True, (200, 200, 200)),
        font.render("C: Liga/desliga a projeção cônica", True, (200, 200, 200)),
    ]
    help_pos_y = 10
    for i in range(len(help)):
        screen.blit(help[i], (10, help_pos_y))
        help_pos_y += 25


def main():
    global CONICAL
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.key.stop_text_input()  # desliga o IME: sem isso, o IBus (ou input method
                                  # equivalente) intercepta teclas seguradas para
                                  # mostrar acentos, e o jogo para de receber o evento
    font = pygame.font.SysFont(None, 22)
    clock = pygame.time.Clock()
    cube = Cube(screen)

    held_keys: set[int] = set()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit(0)
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_c:
                    CONICAL = not CONICAL
                elif event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit(0)
                else:
                    held_keys.add(event.key)
            elif event.type == pygame.KEYUP:
                held_keys.discard(event.key)  # remove só a tecla solta, não todas

        cube.apply_held_keys(held_keys)

        screen.fill(Color_screen)
        cube.draw()
        show_help(screen, font)

        pygame.display.flip()
        clock.tick(FPS)  # trava o loop em 60 quadros por segundo


if __name__ == "__main__":
    main()
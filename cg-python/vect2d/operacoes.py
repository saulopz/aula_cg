import pygame
import copy
from math import sin, cos, radians


class Ponto:
    def __init__(self, x: float, y: float):
        self.x: float = x
        self.y: float = y


def draw(tela, figura, cor):
    size = len(figura)
    for i in range(size):
        j = i + 1
        if j >= size:
            j = 0
        pygame.draw.line(tela, cor,
            (figura[i].x, figura[i].y),
            (figura[j].x, figura[j].y), 1)


def translacao(figura, tx, ty):
    for i in range(len(figura)):
        figura[i].x = figura[i].x + tx
        figura[i].y = figura[i].y + ty


def escala(figura, sx, sy):
    pivo_x = figura[0].x
    pivo_y = figura[0].y
    translacao(figura, -pivo_x, -pivo_y)
    for i in range(len(figura)):
        figura[i].x = figura[i].x * sx
        figura[i].y = figura[i].y * sy
    translacao(figura, pivo_x, pivo_y)


def rotacao(figura, ang):
    # o angulo precisa ser transformado em radianos
    ang = radians(ang)
    pivo_x = figura[0].x
    pivo_y = figura[0].y
    translacao(figura, -pivo_x, -pivo_y)
    for i in range(len(figura)):
        x2 = (figura[i].x * cos(ang)) + (figura[i].y * -sin(ang))
        y2 = (figura[i].x * sin(ang)) + (figura[i].y *  cos(ang))
        figura[i].x = x2
        figura[i].y = y2
    translacao(figura, pivo_x, pivo_y)


# PROGRAMA PRINCIPAL ------------------------------

pygame.init()
tela = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Triângulo")

triangulo = [
    Ponto(200, 250),
    Ponto(300, 150),
    Ponto(400, 250)
]

t2 = copy.deepcopy(triangulo)
t3 = copy.deepcopy(triangulo)
t4 = copy.deepcopy(triangulo)

translacao(t2, 20, 40)
escala(t3, 0.5, 1.6)
rotacao(t4, 90)

rodando = True
while rodando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False
    tela.fill((255, 255, 255))  # Fundo branco
    draw(tela, triangulo, (255, 0, 0))

    # Para ver uma operação específica, comente as demais
    draw(tela, t2, (0, 0, 255))     # Triangulo transladado
    draw(tela, t3, (0, 0, 255))     # Triangulo redimensionado
    draw(tela, t4, (0, 0, 255))     # Triangulo rotacionado
    
    pygame.display.flip()
pygame.quit()

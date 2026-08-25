import sys
import pygame
import math


# Rotaciona um ponto x, y pelo angulo ang.
def rot_xy(x, y, ang):
    x2 = (x * math.cos(ang)) + (y * -math.sin(ang))
    y2 = (x * math.sin(ang)) + (y * math.cos(ang))
    return int(x2), int(y2)


# Pego o novo tamanho da imagem
def get_new_image_size(w, h, ang):
    # pega todos os vertices do retangulo
    vertex = [[0, 0], [w, 0], [w, h], [0, h]]
    # rotaciona todos os pontos
    for i in range(4):
        x, y = rot_xy(vertex[i][0], vertex[i][1], ang)
        vertex[i] = [x, y]
    # pega os mínimos e máximos
    x_min = 0
    y_min = 0
    x_max = 0
    y_max = 0
    for i in range(4):
        if vertex[i][0] < x_min:
            x_min = vertex[i][0]
        if vertex[i][0] > x_max:
            x_max = vertex[i][0]
        if vertex[i][1] < y_min:
            y_min = vertex[i][1]
        if vertex[i][1] > y_max:
            y_max = vertex[i][1]
    return (x_max - x_min), (y_max - y_min)


# Função de espelhamento. O resultado é colocado em surface
def rotation(image, surface, ang):
    w_orig = image.get_width()      # largura da imagem de origem
    h_orig = image.get_height()     # altura da imagem de origem

    w_mid_orig = int(w_orig / 2)    # metade da largura da imagem de origem
    h_mid_orig = int(h_orig / 2)    # metade da altura da imagem de origem

    w_dest = surface.get_width()    # largura da imagem de destino
    h_dest = surface.get_height()   # altura da imagem de destino

    w_mid_dest = int(w_dest / 2)    # metade da largura da imagem de estino
    h_mid_dest = int(h_dest / 2)    # metade da altura da imagem de destino

    for y in range(h):          # para cada linha da imagem de origem
        for x in range(w):      # para cada coluna da imagem de origem
            # translada o ponto para o meio negativo da imagem de origem
            xaux = x - w_mid_orig
            yaux = y - h_mid_orig
            # rotaciona o ponto
            xaux, yaux = rot_xy(xaux, yaux, ang)
            # translada o ponto pegando o meio da imagem de destino
            xaux = xaux + w_mid_dest
            yaux = yaux + h_mid_dest
            # imprime o pixel na posição calculada da imagem de destino
            surface.set_at((xaux, yaux), image.get_at((x, y)))


# PROGRAMA PRINCIPAL
pygame.init()

file_in = sys.argv[1]
file_out = sys.argv[2]
# o angulo é horário, vamos trabalhar no anti-horário
angle = -math.radians(int(sys.argv[3]))

image = pygame.image.load(file_in)
w = image.get_width()
h = image.get_height()

# cria a surface com a proporção a ser alterada
ws, hs = get_new_image_size(w, h, angle)
surface = pygame.display.set_mode((ws, hs))

# chama a função fazer o espelhamento
rotation(image, surface, angle)

# salva a imagem
pygame.image.save(surface, file_out)

pygame.display.set_caption(file_in)

finish = False
while not finish:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            finish = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                finish = True
    pygame.display.update()
pygame.quit()
quit()

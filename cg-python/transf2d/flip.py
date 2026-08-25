import sys
import pygame


# Função de espelhamento. O resultado é colocado em surface
def flip(image, surface):
    w = image.get_width()
    h = image.get_height()
    for y in range(h):
        for x in range(w):
            # coloca o último pixel na primeira posição,
            # o penúltimo na segunda, e assim por diante.
            # surface.set_at((w - 1 - x, y), image.get_at((x, y)))
            surface.set_at((w -1 -x, h - 1 - y), image.get_at((x, y)))


# PROGRAMA PRINCIPAL
pygame.init()

file_in = sys.argv[1]
file_out = sys.argv[2]

image = pygame.image.load(file_in)
w = image.get_width()
h = image.get_height()

# cria a surface com a proporção a ser alterada
surface = pygame.display.set_mode((w, h))

# chama a função fazer o espelhamento
flip(image, surface)

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

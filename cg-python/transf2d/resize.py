import sys
import pygame


# Retorna x e y equivalente da imagem original na destino
def get_dest_xy(x_orig, y_orig, proportion):
    x = int(proportion * x_orig / 100)  # calcula a regra de tres de x
    y = int(proportion * y_orig / 100)  # calcula a regra de tres de y
    return x, y


# Retorna x e y equivalente da imagem destino na original
def get_orig_xy(x_dest, y_dest, proportion):
    p = 100 / (proportion / 100)    # pega o percentual invertido
    x = int(p * x_dest / 100)       # calcula a regra de tres de x
    y = int(p * y_dest / 100)       # calcula a regra de tres de y
    return x, y


# Redimensiona a imagem
def resize(image, surface, proportion):
    # Para cada coluna da imagem de destino
    for y in range(surface.get_height()):
        # Para cada linha da imagem de destino
        for x in range(surface.get_width()):
            # pega o x e y relativo da imagem original
            x2, y2 = get_orig_xy(x, y, proportion)
            # e pinta na imagem de destino
            surface.set_at((x, y), image.get_at((x2, y2)))


# PROGRAMA PRINCIPAL
pygame.init()

file_in = sys.argv[1]
file_out = sys.argv[2]
proportion = int(sys.argv[3])

image = pygame.image.load(file_in)
w = image.get_width()
h = image.get_height()
sw, sh = get_dest_xy(w, h, proportion)

# cria a surface com a proporção a ser alterada
surface = pygame.display.set_mode((sw, sh))

# chama a função pra redimensionar
resize(image, surface, proportion)

# salva a surface como nova imagem
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

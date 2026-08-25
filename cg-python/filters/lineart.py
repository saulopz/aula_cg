import sys
import pygame


def line_art(image, surface, limiar):
    surface.fill((255, 255, 255))
    for y in range(image.get_height()):
        for x in range(image.get_width()):
            # primeiro calculamos o tom de cinza do pixel
            r, g, b, a = image.get_at((x, y))
            c = ((0.299 * r) + (0.587 * g) + (0.114 * b))
            # e depois separamos pelo limiar
            if c < limiar:
                c = 0  # se menor que o limiar, fica preto
            else:
                c = 255  # se maior, fica branco
            surface.set_at((x, y), (c, c, c))


argc = len(sys.argv)
img_in = sys.argv[1]
img_out = sys.argv[2]
limiar = 100

if len(sys.argv) == 4:
    limiar = int(sys.argv[3])

pygame.init()

image = pygame.image.load(img_in)
w = image.get_width()
h = image.get_height()
surface = pygame.display.set_mode((w, h))

line_art(image, surface, limiar)

pygame.display.set_caption(
    img_in + ' -> ' + img_out + ' limiar: ' + str(limiar))

finish = False
#pygame.key.set_repeat(1)
while not finish:
    for event in pygame.event.get():
        keypressed = False
        if event.type == pygame.QUIT:
            finish = True
        elif event.type == pygame.KEYDOWN:
            # Vamos as teclas para mudar o limiar em
            # tempo de execução. Seta para cima aumenta
            # o limiar e seta para baixo diminui
            if event.key == pygame.K_ESCAPE:
                finish = True
            if event.key == pygame.K_UP:
                limiar += 10
                keypressed = True
                if limiar > 255:
                    limiar = 255
            if event.key == pygame.K_DOWN:
                limiar -= 10
                keypressed = True
                if limiar < 0:
                    limiar = 0
        if keypressed:
            pygame.display.set_caption(
                img_in + ' -> ' + img_out + ' limiar: ' + str(limiar))
            line_art(image, surface, limiar)
        pygame.display.update()

pygame.image.save(surface, img_out)
pygame.quit()
quit()

import sys
import pygame


def gray_scale(img):
    for y in range(image.get_height()):
        for x in range(image.get_width()):
            r, g, b, a = image.get_at((x, y))
            c = ((0.299 * r) + (0.587 * g) + (0.114 * b))
            image.set_at((x, y), (c, c, c))

'''
Matrizes de convolução do algoritmo de Roberts para detecção
de bordas
     
GX = | +1  0 |
     |  0 -1 |

GY = |  0 +1 |
     | -1  0 |
'''


def roberts(img):
    for y in range(h-1):
        for x in range(w-1):
            a, _, _, _ = image.get_at((x, y))
            b, _, _, _ = image.get_at((x+1, y))
            c, _, _, _ = image.get_at((x, y+1))
            d, _, _, _ = image.get_at((x+1, y+1))

            gx = d - a
            gy = b - c
            g = abs(abs(gx) + abs(gy))
            if g > 255:
                g = 255
            g = 255 - g
            image.set_at((x, y), (g, g, g))


argc = len(sys.argv)
img_in = sys.argv[1]
img_out = sys.argv[2]

pygame.init()
white = (255, 255, 255)
image = pygame.image.load(img_in)
w = image.get_width()
h = image.get_height()
surface = pygame.display.set_mode((w, h))

gray_scale(image)   # Primeiro deixamos em tons de cinza
roberts(image)      # Depois detectamos as bordas usando Roberts

pygame.image.save(image, img_out)

pygame.display.set_caption("Roberts - " + img_out)

finish = False
while not finish:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            finish = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                finish = True
    surface.blit(image, (0, 0))
    pygame.display.update()
pygame.quit()
quit()

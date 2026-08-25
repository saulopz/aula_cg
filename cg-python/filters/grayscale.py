import sys
import pygame


def gray_scale(img):
    for y in range(image.get_height()):
        for x in range(image.get_width()):
            r, g, b, a = image.get_at((x, y))
            c = ((0.299 * r) + (0.587 * g) + (0.114 * b))
            image.set_at((x, y), (c, c, c))


argc = len(sys.argv)
img_in = sys.argv[1]
img_out = sys.argv[2]

pygame.init()

image = pygame.image.load(img_in)
w = image.get_width()
h = image.get_height()
surface = pygame.display.set_mode((w, h))

gray_scale(image)

pygame.image.save(image, img_out)

pygame.display.set_caption(img_in + ' -> ' + img_out)

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

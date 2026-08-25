import sys
import pygame
import matplotlib.pyplot as plt

pygame.init()

filename = sys.argv[1]
image = pygame.image.load(filename)

hist_x = []
hist_y = []
for i in range(256):
    hist_x.append(i)
    hist_y.append(0)

for y in range(image.get_height()):
    for x in range(image.get_width()):
        r, g, b, a = image.get_at((x, y))
        gray = int((0.299 * r) + (0.587 * g) + (0.114 * b))
        hist_y[gray] += 1

plt.plot(hist_x, hist_y)
plt.show()

pygame.quit()
quit()

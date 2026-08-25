import sys
import pygame
import matplotlib.pyplot as plt

pygame.init()

filename = sys.argv[1]
image = pygame.image.load(filename)

hist_x = []
hist_yr = []
hist_yg = []
hist_yb = []
for i in range(256):
    hist_x.append(i)
    hist_yr.append(0)
    hist_yg.append(0)
    hist_yb.append(0)

for y in range(image.get_height()):
    for x in range(image.get_width()):
        r, g, b, _ = image.get_at((x, y))
        hist_yr[r] += 1
        hist_yg[g] += 1
        hist_yb[b] += 1

plt.plot(hist_x, hist_yr, color="red")
plt.plot(hist_x, hist_yg, color="green")
plt.plot(hist_x, hist_yb, color="blue")
plt.show()

pygame.quit()
quit()

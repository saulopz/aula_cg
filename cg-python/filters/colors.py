# import pygame module in this program
import pygame

# activate the pygame library. initiate pygame and give permission to use pygame's functionality.
pygame.init()

# define the RGB value for white colour
white = (255, 255, 255)

# create a surface object, image is drawn on it.
image = pygame.image.load('img.jpg')

w = image.get_width()
h = image.get_height()

# create the display surface object of specific dimension..e(X, Y).
display_surface = pygame.display.set_mode((w, h))

for y in range(h):
    for x in range(w):
        r, g, b, a = image.get_at((x, y)) # get pixel
        image.set_at((x, y), (r, r, r))

pygame.image.save(image, "out.jpg")

# set the pygame window name
pygame.display.set_caption('Image')

# infinite loop
while True:
    # completely fill the surface object with white colour
    display_surface.fill(white)

    # copying the image surface object to the display surface object at (0, 0) coordinate.
    display_surface.blit(image, (0, 0))

    # iterate over the list of Event objects that was returned by pygame.event.get() method.
    for event in pygame.event.get():

        # if event object type is QUIT then quitting the pygame and program both.
        if event.type == pygame.QUIT:
            # deactivates the pygame library
            pygame.quit()
            # quit the program.
            quit()

        # Draws the surface object to the screen.
        pygame.display.update()

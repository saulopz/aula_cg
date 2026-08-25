import sys                                          # importa a biblioteca sys
import pygame                                       # importa a biblioteca pygame

# INIT: inicialização dos dados, load dos recursos, etc.
pygame.init()                                       # inicializa o pygame

filename = sys.argv[1]                              # pega o parâmetro de entrada

image = pygame.image.load(filename)                 # le a imagem do arquivo
w = image.get_width()                               # retorna a largura da imagem
h = image.get_height()                              # retorna a altura da imagem

display_surface = pygame.display.set_mode((w, h))   # ajusta para o tamanho da imagem
pygame.display.set_caption(filename)                # nome da imagem como título da janela

# GAME_LOOP: ocorre a cada frame
finish = False                                      # flag para game loop continuar
while not finish:                                   # enquanto não terminou
    # PROCESS_INPUT: é de responsabilidade da biblioteca
    # EXECUTE: usa as entradas ou informações para fazer algo
    for event in pygame.event.get():                # verifica os eventos do pygame
        if event.type == pygame.QUIT:               # se clicou no botão [x]
            finish = True                           # ... fim do game loop
        elif event.type == pygame.KEYDOWN:          # se uma tecla foi pressionada
            if event.key == pygame.K_ESCAPE:        # ... e a tecla for ESC
                finish = True                       # ... fim do game loop
    # RENDER: apresenta as imagens na tela
    display_surface.blit(image, (0, 0))             # mostra a imagem
    pygame.display.update()                         # atualiza o display

# END: finaliza o game
pygame.quit()                                       # finaliza o pygame
quit()                                              # finaliza o programa

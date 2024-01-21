# ParcialDefJuanCammarano
Instrucciones de juego:
Los usuarios entran al juego a través del "homepage", la cual al primero al entrar lo redirecciona a la pantalla de anfitrión, mientras que a todos los demás que se unan los redirecciona a la pantalla de invitado (jugador).
El anfitrión podrá elegir la palabra que quiera pulsando el botón de "cambiar palabra", pero no podrá iniciar la partida sino hasta que haya al menos dos invitados (pues el botón "iniciar" queda desactivado hasta entonces), los cuales estarán esperando a que el anfitrión inicie. 
Una vez empezada la partida, se despliegan en todas las pantallas el dibujo del ahorcado (el cual se irá dibujando a medida que vayan aumentando los errores),la palabra a adivinar en guiones bajos (la cual al adivinar una letra, se rellenarán los guiones bajos de su posición respectiva)y el número total de errores cometidos. Además en las pantallas de los invitados se mostrarán el teclado para introducir las letras y las pistas que vaya dando el anfitrión (el cual tiene un input y un botón para enviarlos, además de que se le muestra a éste la palabra arriba). Si los invitados logran adivinar la palabra ganarán, de lo contrario al llegar a un total de 6 errores "ganará" el ahorcado. Independientemente del resultado, se le muestra el botón de jugar de nuevo al anfitrión y a los invitados el mensaje de esperar por el anfitrión, quien al presionar dicho botón, redirigirá a todos de nuevo a la pantalla pre-juego.

Marco de trabajo:
Express

APIS utilizadas:
Fetch para la palabra a adivinar
Socket.io(webSockets)

Instrucciones de ejecución: Presionar "node src/index.js en la terminal"

Nota1: El puerto del servidor por predeterminado es el 8000.
Nota2: En caso de que el boton "iniciar" no se desactive/active, esperar unos segundos 
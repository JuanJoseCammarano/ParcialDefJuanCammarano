socket = io('http://localhost:8000');
const esperando = document.querySelector(".esperando p");
const pistaText = document.querySelector(".pista p");
const deNuevo = document.querySelector(".deNuevo p");
let errores=0;
let word='';
const erroresText= document.querySelector(".errores p")
const dibujo = function(errores){
    switch (errores) {
        case 0:
            return (`
____
|    /   |
|   
|    
|    
|    
|
|_____
        `)
        case 1:
            return (`
|     /   |
|        (_)
|    
|    
|    
|
|_____
        `)
        case 2:
            return (`
            |     /   |
            |        (_)
            |           |
            |           |
            |    
            |    
            |_____
        `)
        case 3:
            return(`
        ____
        |/        |
        |        (_)
        |        \\|
        |         |
        |    
        |
        |_____
            `)
        case 4:
            return(`
        ____
        |/        |
        |        (_)
        |        \\|/
        |            |
        |    
        |
        |_____
                    `) 
        case 5:
            return (`
            ____
            |/        |
            |        (_)
            |        \\|/
            |            |
            |        /
            |
            |_____
            `)
        case 6:
            return (`
            ____
            |/        |
            |        (_)
            |        \\|/
            |            |
            |        /  \
            |
            |_____
            `)
    } 
}
socket.on('connect', () => {
    socket.emit('invitado');
    esperando.innerText="esperando a que comience el anfitrion" 
});
const guess = document.querySelector('.word p');
socket.on('inicioJugador',(palabra)=>{
    socket.emit('avisarAdmin');
    esperando.innerText="";
    const keyboardDiv = document.querySelector(".keyboard");
    word = palabra.toUpperCase();
    let errores = 0;
    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }  
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }
    let underScores ='';
    for (let i=0; i<word.length; i++){
    underScores+="_"
    }
    guess.innerText = underScores;
    const hangman = document.querySelector('.hangman p');
    const result = document.querySelector('.result p');
    for (let i= 97; i <= 122; i++){
            const button = document.createElement("button");
            button.innerText = String.fromCharCode(i).toUpperCase();
            keyboardDiv.appendChild(button);
            button.addEventListener("click", function () {
                const letra = button.innerHTML;
                socket.emit('letra',letra);
            })
    }
    socket.on('letraCorrecta',(letter,j)=>{
        guess.innerText = guess.innerText.replaceAt(j,letter);
        if (guess.innerText===word) {
            result.innerText="Ganaste!"
            while (keyboardDiv.firstChild){
                keyboardDiv.removeChild(keyboardDiv.firstChild)
            }
            pistaText.innerText="";
            deNuevo.innerText="Esperando al anfitrion para iniciar de nuevo"
        }
    })
    socket.on('letraIncorrecta',(totalErrores)=>{
        errores++;
        hangman.innerText=dibujo(errores);
        erroresText.innerText="Errores: "+errores;
        if (totalErrores==6) {
            result.innerText="Perdiste! La palabra era "+word;
            while (keyboardDiv.firstChild){
                keyboardDiv.removeChild(keyboardDiv.firstChild);
            }
            pistaText.innerText="";
            deNuevo.innerText="Esperando al anfitrion para iniciar de nuevo"
        }
    })
    socket.on('pista',(pista)=>{
        pistaText.innerText="Pista: "+pista;
    })
    hangman.innerText=dibujo(0);
    socket.on('nuevaPartidaI',()=>{
        window.location.href='../homepage.html';
    })
})

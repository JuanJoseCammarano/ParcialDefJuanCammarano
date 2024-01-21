socket = io('http://localhost:8000');
let idsUsers = [];
const Iniciar = document.querySelector(".botonIniciar");
const cambiar = document.querySelector(".botonCambiar");
const textPalabra = document.querySelector("h1");
const guess = document.querySelector('.word p');
const hangman = document.querySelector('.hangman p');
const result = document.querySelector('.result p');
const keyboardDiv = document.querySelector(".keyboard");
const input = document.createElement("input")
const button = document.createElement("button");
const deNuevo = document.querySelector(".deNuevo");
const botonDeNuevo = document.createElement("button");
botonDeNuevo.innerText = "Jugar de nuevo"
button.innerText = "Enviar Pista";
let errores=0;
let word='';
const erroresText= document.querySelector(".errores p")
const botonIniciar = document.createElement("button")
botonIniciar.disabled=true;
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
    let palabra='';
    async function fetchWord() {
        const response = await fetch('https://pow-3bae6d63ret5.deno.dev/word')
        const data = await response.json();
        palabra=data.word;
        textPalabra.innerText=palabra;
    }
    fetchWord();
    botonIniciar.innerText = "iniciar"
    Iniciar.appendChild(botonIniciar);
    const botonCambiar = document.createElement("button")
    botonCambiar.innerText = "Cambiar Palabra"
    cambiar.appendChild(botonCambiar);
    botonCambiar.addEventListener("click", function () {
        fetchWord();
    })
    function iniciar (){
        palabra=textPalabra.innerText;
        socket.emit('inicioAdmin', palabra)
    }
    botonIniciar.addEventListener("click", function () {
        iniciar();
    })
})
socket.on('activarIniciar',()=>{
    botonIniciar.disabled=false;
})
socket.on('desactivarIniciar',()=>{
    botonIniciar.disabled=true;
})
socket.on('desplegarAdmin',()=>{
    while (Iniciar.firstChild){
        Iniciar.removeChild(Iniciar.firstChild)
    }
    while (cambiar.firstChild){
        cambiar.removeChild(cambiar.firstChild)
    }
    keyboardDiv.appendChild(input)
    keyboardDiv.appendChild(button)
    word = textPalabra.innerText.toUpperCase();
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
    let pista;
    button.addEventListener("click", function () {
        pista=input.value;
        socket.emit('pista',pista);
    })
    hangman.innerText=dibujo(0);
})
socket.on('letra',(letter)=>{
    if (word.includes(letter)&& !guess.innerText.includes(letter)){
        for (let i = 0; i < word.length; i++){
            if (word[i] === letter){
                socket.emit('letraCorrecta',letter,i);
                guess.innerText = guess.innerText.replaceAt(i,letter);
                if (guess.innerText===word) {
                    result.innerText="Ganan los invitados!"
                    while (keyboardDiv.firstChild){
                        keyboardDiv.removeChild(keyboardDiv.firstChild);
                    }
                    deNuevo.appendChild(botonDeNuevo);
                    botonDeNuevo.addEventListener("click", function () {
                        window.location.href='../admin.html';
                        socket.emit('nuevaPartida')
                    })
                }
            }
        }
    }
    else{
        errores++;
        hangman.innerText=dibujo(errores);
        socket.emit('letraIncorrecta',errores);
        erroresText.innerText="Errores: "+errores;
        if (errores==6) {
            result.innerText="Gana el ahorcado!"
            while (keyboardDiv.firstChild){
                keyboardDiv.removeChild(keyboardDiv.firstChild);
            }
            deNuevo.appendChild(botonDeNuevo);
            botonDeNuevo.addEventListener("click", function () {
                window.location.href='../admin.html';
                socket.emit('nuevaPartida')
            })
        }
    }
})

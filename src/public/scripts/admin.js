socket = io('http://localhost:8000');
const Iniciar = document.querySelector(".botonIniciar");
const cambiar = document.querySelector(".botonCambiar");
const textPalabra = document.querySelector("h1");
const guess = document.querySelector('.word p');
const hangman = document.querySelector('.hangman p');
const result = document.querySelector('.result p');
const keyboardDiv = document.querySelector(".keyboard");
const input = document.createElement("input")
const button = document.createElement("button");
button.innerText = "enviar";
let errores=0;
let word='';
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
        console.log(data.word);
        palabra=data.word;
        textPalabra.innerText=palabra;
    }
    fetchWord();
    const botonIniciar = document.createElement("button")
    botonIniciar.innerText = "iniciar"
    Iniciar.appendChild(botonIniciar);
    const botonCambiar = document.createElement("button")
    botonCambiar.innerText = "cambiar"
    cambiar.appendChild(botonCambiar);
    botonCambiar.addEventListener("click", function () {
        fetchWord();
    })
    function iniciar (){
        palabra=textPalabra.innerText;
        console.log(palabra);
        socket.emit('inicioAdmin', palabra)
    }
    botonIniciar.addEventListener("click", function () {
        iniciar();
    })
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
    console.log(word);
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
    /*const input = document.createElement("input")
    const button = document.createElement("button");
    button.innerText = "enviar";
    keyboardDiv.appendChild(input);
    keyboardDiv.appendChild(button);*/
    let pista;
    button.addEventListener("click", function () {
        pista=input.value;
    })
    hangman.innerText=dibujo(0);
})
socket.on('letra',(letter)=>{
    if (word.includes(letter)&& !guess.innerText.includes(letter)){
        console.log("acierto");
        for (let i = 0; i < word.length; i++){
            if (word[i] === letter){
                socket.emit('letraCorrecta',letter,i);
                guess.innerText = guess.innerText.replaceAt(i,letter);
                if (guess.innerText===word) {
                    result.innerText="Ganan los invitados!"
                    while (keyboardDiv.firstChild){
                        keyboardDiv.removeChild(keyboardDiv.firstChild);
                    }
                }
            }
        }
    }
    else{
        errores++;
        hangman.innerText=dibujo(errores);
        socket.emit('letraIncorrecta',errores);
        if (errores==6) {
            result.innerText="Gana el ahorcado!"
            while (keyboardDiv.firstChild){
                keyboardDiv.removeChild(keyboardDiv.firstChild);
            }
        }
    }
})
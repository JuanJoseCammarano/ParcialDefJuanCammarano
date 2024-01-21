//const { arrayBuffer } = require("stream/consumers");
socket = io('http://localhost:8000');
const esperando = document.querySelector(".esperando p");
socket.on('connect', () => {
    socket.emit('guest');
    esperando.innerText="esperando a que comience el anfitrion" 
});
socket.on('inicioJugador',(palabra)=>{
    console.log("entro");
    esperando.innerText="";
    const keyboardDiv = document.querySelector(".keyboard");
    let word = palabra.toUpperCase();
    console.log(word);
    let errores = 0;
    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }  
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }
    let underScores ='';
    const guess = document.querySelector('.word p');
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
                const letter = button.innerHTML;
                if (word.includes(letter)&& !guess.innerHTML.includes(letter)){
                    console.log("acierto");
                    for (let i = 0; i < word.length; i++){
                        if (word[i] === letter){
                            guess.innerText = guess.innerText.replaceAt(i,letter);
                            if (guess.innerText===word) result.innerText="Ganaste!"
                        }
                    }  
                }
                else{
                    errores++;
                    hangman.innerText=dibujo(errores);
                    if (errores==6) {
                        result.innerText="Perdiste!"
                        while (keyboardDiv.firstChild){
                            keyboardDiv.removeChild(keyboardDiv.firstChild);
                        }
                    }
                } 
            })
    }
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
    hangman.innerText=dibujo(0);
})

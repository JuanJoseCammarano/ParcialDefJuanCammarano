//const { arrayBuffer } = require("stream/consumers");
//const keyboardDiv = document.querySelector(".keyboard");
let word = "PAW";
/*for (let i= 97; i <= 122; i++){
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
}*/
//const underScores = (word) => {
    let underScores ='';
    const guess = document.querySelector('p');
    for (let i=0; i<word.length; i++){
    underScores+="_    "
    }
    guess.innerText = underScores;
    //const palabra = document.createElement('p')
    /*const p = document.createElement("p");
    p.innerText = underScores;
    wordDiv.appendChild(p);*/
//}
/*
function handleGuess(str){
    for (let i=0; i<word.length; i++){
        if ('A' === word[i]) console.log ("Esta");
    }
}*/
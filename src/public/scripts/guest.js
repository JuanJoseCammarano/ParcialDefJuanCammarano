//const { arrayBuffer } = require("stream/consumers");
const keyboardDiv = document.querySelector(".keyboard");
let word = "PAW";
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}
let underScores ='';
const guess = document.querySelector('p');
for (let i=0; i<word.length; i++){
underScores+="_"
}
guess.innerText = underScores;
for (let i= 97; i <= 122; i++){
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i).toUpperCase();
        keyboardDiv.appendChild(button);
        button.addEventListener("click", function () {
            const letter = button.innerHTML;
            if (word.includes(letter) && !guess.innerHTML.includes(letter)){
                for (let i = 0; i < word.length; i++){
                    if (word[i] === letter){
                        /*stringAnterior=guess.innerText.substring(0,i);
                        stringRestante=guess.innerText.substring(i+1,word.length-1);
                        guess.innerHTML = stringAnterior + letter + stringRestante;*/
                        guess.innerText = guess.innerText.replaceAt(i,letter);
                    }
                }  
            } 
        })
}
//const underScores = (word) => {
    //const palabra = document.createElement('p')
    /*const p = document.createElement("p");
    p.innerText = underScores;
    wordDiv.appendChild(p);*/
//}

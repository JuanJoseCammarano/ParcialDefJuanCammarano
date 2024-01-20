socket = io('http://localhost:8000');
let idsUsers = [];
let userId = socket.id;
//const { response } = require("express");
const hostPanel= document.querySelector(".anfitrion");
socket.on('connect', () => {
    /*socket.on('userId', (id)=>{
        userId=id
        console.log(userId);
    })*/
    console.log(socket.id);
    let palabra='pepe';
    socket.on('usersIds', (ids)=>{
        idsUsers=[...ids];
    })
    let word="pepe";
    socket.on('role', () => {
        if (idsUsers.length===1){
            const h2 = document.createElement("h2");
            h2.innerText = word;
            hostPanel.appendChild(h2);
        }
    })
    socket.emit('enviar-palabra-todos',palabra, socket.id);
});
/*
let palabra='';
async function fetchWord() {
    const response = await fetch('https://pow-3bae6d63ret5.deno.dev/word')
    const word = await response.json();
    palabra=JSON.stringify(word).subString(7,JSON.stringify(word).length -1);
    console.log(palabra);
}*/
socket = io('http://localhost:8000');
let idsUsers = [];
let userId = socket.id;
//const { response } = require("express");
const hostPanel= document.querySelector(".anfitrion");

let palabra='';
async function fetchWord() {
    const response = await fetch('https://pow-3bae6d63ret5.deno.dev/word')
    const data = await response.json();
    console.log(data.word);
    palabra=data.word;
}
fetchWord();
socket.on('connect', () => {

    /*
    console.log(socket.id);
    let palabra='pepe';
    let word="pepe";
    socket.on('role', () => {
        if (idsUsers.length===1){
            const h2 = document.createElement("h2");
            h2.innerText = word;
            hostPanel.appendChild(h2);
        }
    })
    */
    socket.on('usersIds', (ids)=>{
        idsUsers=[...ids];
        if (idsUsers.length===1) window.location.href='../admin.html';
        else window.location.href='../guest.html';
    })

    socket.emit('enviar-palabra-todos',palabra, socket.id);
});
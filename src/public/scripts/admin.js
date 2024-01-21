socket = io('http://localhost:8000');
socket.on('connect', () => {
    const textPalabra = document.querySelector(".palabra p");
    let palabra='';
    async function fetchWord() {
        const response = await fetch('https://pow-3bae6d63ret5.deno.dev/word')
        const data = await response.json();
        console.log(data.word);
        palabra=data.word;
        textPalabra.innerText=palabra;
    }
    fetchWord();
    const Iniciar = document.querySelector(".botonIniciar");
    const cambiar = document.querySelector(".botonCambiar")
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

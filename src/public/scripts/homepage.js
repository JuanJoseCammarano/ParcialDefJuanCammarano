const socket = io('http://localhost:8000');
socket.on('connect', () => {
    console.log('someone connected!');
    let palabra='pepe';
    socket.emit('enviar-palabra-todos',palabra, socket.id)
});
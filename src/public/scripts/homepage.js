socket = io('http://localhost:8000');
let idsUsers = [];
socket.on('connect', () => {
    socket.on('usersIds', (ids)=>{
        idsUsers=[...ids];
        if (idsUsers.length===1) window.location.href='../admin.html';
        else window.location.href='../guest.html';
    })
});
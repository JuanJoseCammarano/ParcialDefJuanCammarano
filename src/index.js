const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8000
const server = app.listen(port, () => console.log(`Listening on port ${port}`))
let ids=[];
//const WebSocket = require('ws');
var anfitrion = '';
const io = require('socket.io')(server, {
    cors:{
        origin:'*',
    }
});
/*const filter = function(ids,element){
    for(i=0;i<ids.length;i++){
        if (ids[i]===element) delete ids[i];
    }
}*/
io.on('connection', (socket) => {
    ids.push(socket.id);
    console.log(ids);
    socket.on('enviar-palabra-todos',(palabra,id)=>{
        console.log(palabra,id);
    })
    socket.on('disconnect', () => {
        console.log(socket.id);
        for (i=0;i<ids.length;i++){
            if (ids[i]===socket.id) ids.splice(i,1);
        }
        console.log(ids)
        /*id=stringify(socket.id)
        ids=ids.filter(id);
        console.log(ids);*/
        socket.emit('role')
    });
    socket.emit('usersIds', ids)
    socket.emit('role')
});
/*io.on('disconnection', (socket) =>{
    console.log("Recibido");
    ids.filter(socket);
    console.log(ids);
})*/
//const io = require("socket.io")(server);
//const socket = io.connect("http://localhost:8080", { forceNew: true });
//const wss = new WebSocket.Server({server: server});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

/*app.get('/index', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});*/

app.get('/guest', function(req,res){
    res.sendFile(path.join(__dirname, 'public/guest.html'));
});
/*wss.on('connection', (wss) => {
    console.log('Conectado');
});*/
/*wss.on('connection', ws => {
    console.log("Un cliente se ha conectado");
});*/
console.log('peinga');
/*app.listen(port);
console.log('Server started at http://localhost:'+ port);*/
/*wss.on('connection', ws => {
    console.log("Un cliente se ha conectado");
});*/

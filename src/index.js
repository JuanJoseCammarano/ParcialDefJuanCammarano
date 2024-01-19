const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require ('path');
//const io = require("socket.io")(server);
//const socket = io.connect("http://localhost:8080", { forceNew: true });
const wss = new WebSocket.Server({server: server});
const port = process.env.PORT || 8080;
app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.get('/index', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
/*wss.on('connection', (wss) => {
    console.log('Conectado');
});*/
/*wss.on('connection', ws => {
    console.log("Un cliente se ha conectado");
});*/
console.log('peinga');
app.listen(port);
console.log('Server started at http://localhost:'+ port);
/*wss.on('connection', ws => {
    console.log("Un cliente se ha conectado");
});*/

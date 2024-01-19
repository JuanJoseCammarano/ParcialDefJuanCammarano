const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require ('path');

const wss = new WebSocket.Server({server:server});

const port = process.env.PORT || 8080;
const pepe='sexo';
app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

app.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.get('/index', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(port);
console.log('Server started at http://localhost:'+ port);


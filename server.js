#!/usr/bin/env node

var express = require('express'),
    app = express(), 
    server = require('http').createServer(app), 
    io = require('socket.io').listen(server);
    
app.use(express.bodyParser());

// it would be nice to use this approach to expose public files
// for some reasons, it didnt work this morning
//app.use(express.static(process.env.PWD + '/public'));

var initialMessage = {name: 'stephane', message: 'welcome', timestamp: new Date()};
var messages = [initialMessage];

app.get('/', function(req, res){
    res.status(200).send(messages);
});

app.get('/view', function(req, res){
    res.sendfile('viewMessages.html');
});

app.get('/public/:file', function(req, res){
    res.sendfile('./public/' + req.params.file);
});

app.post('/', function(req, res){
    console.log(req.body.name, ' : ', req.body.message);
    messages.push(req.body);
    io.sockets.emit('newMessage', req.body);
    res.send(200);
});

io.sockets.on('connection', function (socket) {
    socket.emit('newMessage', initialMessage);
});

server.listen(3000);

console.log('Server running...');
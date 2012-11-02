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

app.post('/', function(req, res){
    var newMessage = req.body;
    
    console.log(newMessage.name, ' : ', newMessage.message);
    messages.push(newMessage);
    io.sockets.emit('newMessage', newMessage);
    res.send(200);
});

app.get('/view', function(req, res){
    res.sendfile('public/viewMessages.html');
});

app.get('/public/:file', function(req, res){
    res.sendfile('./public/' + req.params.file);
});



io.sockets.on('connection', function (socket) {
    socket.emit('newMessage', initialMessage);
});

server.listen(3000);

console.log('Server running...');
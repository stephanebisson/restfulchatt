#!/usr/bin/env node

var express = require('express'),
    app = express();
    
app.use(express.bodyParser());

var initialMessage = {name: 'stephane', message: 'welcome', timestamp: new Date()};
var messages = [initialMessage];

app.get('/', function(req, res){
    res.status(200).send(messages);
});

app.post('/', function(req, res){
    console.log(req.body.name, ' : ', req.body.message);
    messages.push(req.body);
    res.send(200);
});

app.listen(3000);
console.log('Server running...');
#!/usr/bin/env node

var serverAddress = process.argv[2] || 'http://localhost:3000';

var request = require('request'),
    readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
    
var username;

var initUserName = function(doAfter){
    rl.question("What is your name?", function(name) {
        username = name;
        doAfter();
    });
};

var messageLoop = function(){
    rl.question("Your message:", function(message) { 
        postMessage(username, message);
        messageLoop();
    });
};

var postMessage = function(name, message){
    request({
        method:'post', 
        url: serverAddress, 
        json:{name: name, message: message, timestamp: new Date()}
    });
};

initUserName(messageLoop);


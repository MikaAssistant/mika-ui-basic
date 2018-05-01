'use strict';
//MIKA NLP
const env = require('dotenv').config().parsed;

//HTTP
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//ROUTER
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){res.sendfile(__dirname + '/index.html');});

http.listen(env.HTTP_PORT, function(){
    console.log('listening on *:'+env.HTTP_PORT);
});
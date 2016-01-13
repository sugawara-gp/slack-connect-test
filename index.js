"use strict";

var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var SLACK_TOKEN = process.env.SLACK_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/hook', (req, res)=> {
    console.log(req.body);
    if (req.body.token == SLACK_TOKEN){
        io.emit('ding', req.body.text);
        res.send(200);
    }else{
        res.send(404);
    }
});

http.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
});

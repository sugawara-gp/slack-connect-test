"use strict";

var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/hook', (req, res)=> {
    // TODO Validate Token
    io.emit('ding', 'ding-message');
    res.send(200);
});

io.on('connection', socket=> {
    console.log('a user connected');
});

http.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});

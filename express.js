'use strict';

const express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(function(req, res, next) {
    res.renderHTML = function(file) {
        res.sendFile(path.resolve(__dirname, './public/' + file + '.html'));
    };
    next();
});

app.get('*', function(req, res) {
    res.renderHTML('index');
});

var port = 3000;
app.listen(port, function() {
    console.log('Listening on', port);
});

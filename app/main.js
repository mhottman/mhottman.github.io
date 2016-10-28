'use strict';

var Bb = require('backbone');
var Mn = require('backbone.marionette');
var $ = require('jquery');


var app = new Mn.Application({
    region: '#app-root',
    onStart: function() {
        console.log("init app");
    }
});


app.start();

'use strict';

var Bb = require('backbone');
var Mn = require('backbone.marionette');
var $ = require('jquery');

var Index = require('./views/index');
var Collection = require('./collections/list');


var app = new Mn.Application({
    onStart: function() {
        var index = new Index({
            collection: new Bb.Collection(testData)
        });
        index.render();
        index.triggerMethod('load');
    }
});


app.start();



var testData = [
    {
        title: 'First',
        completed: false,
        dueDate: null
    },
    {
        title: 'Second',
        completed: false,
        dueDate: null
    }
];

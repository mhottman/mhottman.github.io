'use strict';

var Mn = require('backbone.marionette');
var root = require('../templates/root.html');

var FormView = require('./form');
var ListView = require('./list');
var TodoModel = require('../models/todo');

var Index = Mn.View.extend({
    template: root,
    el: '#app-root',

    regions: {
        form: '#form',
        list: '#list'
    },

    onLoad: function() {
        //render sub views on load
        var form = new FormView({
            model: new TodoModel()
        });
        var list = new ListView({
            collection: this.collection
        });

        this.showChildView('form', form);
        this.showChildView('list', list);
    },

    onChildviewAddTodo: function(child) {
        var val = child.ui.input[0].value;
        var todo = new TodoModel({
            title: val
        });
        this.collection.add(todo);
    },
    
});


module.exports = Index;

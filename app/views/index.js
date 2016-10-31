'use strict';

var Mn = require('backbone.marionette');
var root = require('../templates/root.html');
var moment = require('moment');

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


        this.setupMaterialize();

    },

    onChildviewAddTodo: function(child) {
        var val = child.ui.input.val();
        var date = this.normalizeDate(child.ui.date.val());
        var todo = new TodoModel({
            title: val,
            dueDate: date,
            dueDateString: this.getDateString(date)
        });

        this.collection.unshift(todo);

        // this.collection.sort();
    },

    onChildviewRemoveTodo: function(child) {
        var model = this.collection.remove(child.model);
    },


    normalizeDate: function(date) {

        if (!date) {
            date = moment()
        }
        if (typeof date === 'string') {
            date = moment(new Date(date));
        }

        return date;
    },

    getDateString: function(date) {
        var rightNow = moment();
        return (moment(date).isSameOrBefore(rightNow)) ? 'now' : moment(date).fromNow();
    },


    setupMaterialize: function() {
        $('.datepicker').pickadate({
            min: new Date()
        });
    }
});


module.exports = Index;

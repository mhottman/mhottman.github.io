'use strict';


var Bb = require('backbone');

var Todo = Bb.Model.extend({
    defaults: {
        completed: false,
        title: '',
        dueDate: new Date(),
        dueDateString: ''
    },
    updateStatus: function() {
        this.set('completed', !this.get('completed'));
    },
    remove: function() {

    }
});


module.exports = Todo;

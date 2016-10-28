'use strict';


var Bb = require('backbone');

var Todo = Bb.Model.extend({
    defaults: {
        completed: false,
        title: '',
        dueDate: null,
        time: null
    },
    updateStatus: function() {
        //this will change completed status
        console.log("this!", this);
    }
});


module.exports = Todo;

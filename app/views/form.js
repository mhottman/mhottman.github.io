'use strict';

var Mn = require('backbone.marionette');
var formTemplate = require('../templates/form.html');


var Form = Mn.View.extend({
    template: formTemplate,

    ui: {
        input: '#title',
        submit: '#submit'
    },

    triggers: {
        'click @ui.submit': 'add:todo'
    },

    // handleSubmit: function() {
    //     console.log("this", this);
    //     this.trigger('submit', 'args??');
    // }


});



module.exports = Form;

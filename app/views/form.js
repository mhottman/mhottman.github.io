'use strict';

var Mn = require('backbone.marionette');
var formTemplate = require('../templates/form.html');


var Form = Mn.View.extend({
    template: formTemplate,

    ui: {
        input: '#title',
        date: '#date',
        submit: '#submit',
    },

    // triggers: {
    //     'click @ui.submit': 'add:todo'
    // },

    events: {
        'keyup @ui.input': 'handleEnterSubmit',
        'click @ui.submit': 'submit'
    },

    handleEnterSubmit: function(e) {
        if (e.keyCode === 13) { //is enter key
            this.submit();
        }

        //show hide disable button
        //if input has content, enable button
        this.showHideSubmit(!e.target.value.trim());
    },

    submit: function() {
        //let one function handle submit
        var val = this.ui.input.val();
        if (this.validInput(val)) {
            this.triggerMethod('add:todo', this);
            this.clearInput();
            this.showHideSubmit(true);
        }
    },

    //input cannot be blank
    validInput: function(val) {
        if (val) {
            val = String(val.trim());
            if (val.length > 0) {
                return true;
            }
        }
        return false;
    },


    clearInput: function() {
        this.ui.input[0].value = '';
        this.ui.date[0].value = '';
    },

    showHideSubmit: function(shouldDisable) {
        if (shouldDisable) {
            this.ui.submit.addClass('disabled');
        } else {
            this.ui.submit.removeClass('disabled');
        }
    }


});



module.exports = Form;

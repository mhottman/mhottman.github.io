'use strict';

var Mn = require('backbone.marionette');
var template = require('../templates/filters.html');

var Filters = Mn.View.extend({
    template: template,
    ui: {
        incomplete: '#incomplete',
        finished: '#finished'
    },
    events: {
        'click @ui.incomplete': 'handleToggle',
        'click @ui.finished': 'handleToggle'
    },

    onAttach: function() {
        this.setDisabled('incomplete');
    },

    handleToggle: function(e) {
        this.setDisabled(e.currentTarget.id);
        this.triggerMethod('set:filter:state');
    },

    setDisabled: function(uiItem) {
        this.ui[uiItem].addClass('disabled');
        var notCurr = (uiItem === 'incomplete') ? 'finished' : 'incomplete';
        this.ui[notCurr].removeClass('disabled');
    },

});



module.exports = Filters;

'use strict';

var Mn = require('backbone.marionette');
var todoTemplate = require('../templates/item.html');

var Item = Mn.View.extend({
    tagName: 'li',
    template: todoTemplate,
    className: 'item',
    ui: {
        statusIcon: '#status',
        removeIcon: '#remove'
    },
    events: {
        'click @ui.statusIcon': 'handleToggle',
        'click @ui.removeIcon': 'handleRemove'
    },

    handleToggle: function(e) {
        this.model.updateStatus();
        this.toggleStrikethrough();
        this.toggleCheck();
    },

    toggleCheck: function(e) {
        if (this.model.get('completed')) {
            this.el.classList.add('completed')
            this.ui.statusIcon.removeClass('fa-square-o');
            this.ui.statusIcon.addClass('fa-check-square-o');
            this.handleAnimate();
        } else {
            this.el.classList.remove('completed')
            this.ui.statusIcon.removeClass('fa-check-square-o');
            this.ui.statusIcon.addClass('fa-square-o');
        }
    },

    toggleStrikethrough: function() {
        this.ui.statusIcon.toggleClass('checked');
        this.ui.statusIcon.toggleClass('unchecked');
    },

    handleAnimate: function() {
        this.ui.statusIcon.addClass('animate');
        setTimeout(function() {
            this.ui.statusIcon.removeClass('animate');
        }.bind(this), 100);
    },

    handleRemove: function() {
        this.triggerMethod('remove:todo', this);
    }
});


module.exports = Item;

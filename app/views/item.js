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
        this.runProcess();
        this.handleAnimate();
        this.triggerMethod('update:toggle:status', this);
    },

    onBeforeAttach: function() {
        this.runProcess();
    },

    onDomRefresh: function() {
        this.runProcess();
    },

    runProcess: function() {
        this.model.updateStatus();
        this.toggleCheck();
    },

    toggleCheck: function(e) {
        if (this.model.get('completed')) {
            this.el.classList.add('completed')
            this.ui.statusIcon.removeClass('fa-square-o');
            this.ui.statusIcon.removeClass('unchecked');
            this.ui.statusIcon.addClass('fa-check-square-o');
            this.ui.statusIcon.addClass('checked');
        } else {
            this.el.classList.remove('completed')
            this.ui.statusIcon.removeClass('fa-check-square-o');
            this.ui.statusIcon.removeClass('checked');
            this.ui.statusIcon.addClass('unchecked');
            this.ui.statusIcon.addClass('fa-square-o');
        }
    },

    handleAnimate: function() {
        this.ui.statusIcon.addClass('animate');
        setTimeout(function() {
            this.ui.statusIcon.removeClass('animate');
        }.bind(this), 100);
    },

    handleRemove: function() {
        this.triggerMethod('remove:todo', this);
    },

    handleSwipeOut: function() {
        this.$el.addClass('fadeout');
        setTimeout(function() {
            this.$el.addClass('fadeout');
        }, 300);
    }
});


module.exports = Item;

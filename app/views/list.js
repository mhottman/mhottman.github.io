'use strict';

var Mn = require('backbone.marionette');

var ListTemplate = require('../templates/list.html');
var ListItem = require('./item');

var List = Mn.CollectionView.extend({
    tagName: 'ul',
    className: 'item-list',
    childView: ListItem,
    comparator: 'dueDate',


    showIncomplete: function(child, index, collection) {
        return !child.get('completed');
    },

    showFinished: function(child, index, collection) {
        return child.get('completed');
    },

    filter: function(child, index, collection) {
        return this.showIncomplete.apply(this, arguments);
    },

    toggleFilter: function(state) {
        state = state.substring(0, 1).toUpperCase() + state.substring(1, state.length);
        this.setFilter(this['show'+state]);
    }


});


module.exports = List;

'use strict';

var Mn = require('backbone.marionette');
var root = require('../templates/root.html');
var moment = require('moment');

var FormView = require('./form');
var ListView = require('./list');
var FilterView = require('./filters');
var TodoModel = require('../models/todo');

var Index = Mn.View.extend({
    template: root,
    el: '#app-root',

    regions: {
        filters: '#filters',
        form: '#form',
        list: '#list'
    },

    components: {
        list: {},
        form: {},
        filters: {}
    },

    filterState: 'incomplete',

    toggleFilterState: function() {
        var state = this.filterState;
        this.filterState = (state === 'incomplete') ? 'finished' : 'incomplete';
    },

    getFilterState: function() {
        return this.filterState;
    },

    onChildviewSetFilterState: function() {
        this.toggleFilterState();
        this.components.list.toggleFilter(this.getFilterState());

    },

    onLoad: function() {
        //render sub views on load
        this.renderList();
        this.renderForm();
        this.renderFilters();

        this.setupMaterialize();

    },

    renderList: function() {
        var list = new ListView({
            collection: this.collection
        });
        this.showChildView('list', list);

        //set global on object for later use
        this.components.list = list;
    },

    renderForm: function() {
        var form = new FormView({
            model: new TodoModel()
        });
        this.showChildView('form', form);

        //set global on object for later use
        this.components.form = form;
    },

    renderFilters: function() {
        var filters = new FilterView({
            collection: this.collection
        });
        this.showChildView('filters', filters);

        //set global on object for later use
        this.components.filters = filters;
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

        //sorted by due date, with soonest due at top
        this.collection.sort();
    },

    onChildviewRemoveTodo: function(child) {
        var model = this.collection.remove(child.model);
    },

    onChildviewUpdateToggleStatus: function(child) {
        //used to filter out checked todos
        console.log("child", child);
        child.handleSwipeOut();
        setTimeout(function() {
            this.components.list.render();
        }.bind(this), 300);
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

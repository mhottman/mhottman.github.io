'use strict';

var Mn = require('backbone.marionette');

var ListTemplate = require('../templates/list.html');
var ListItem = require('./item');

var List = Mn.CollectionView.extend({
    tagName: 'ul',
    childView: ListItem
});


module.exports = List;

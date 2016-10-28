'use strict';

var Mn = require('backbone.marionette');
var todoTemplate = require('../templates/item.html');

var Item = Mn.View.extend({
    tagName: 'li',
    template: todoTemplate
});


module.exports = Item;

'use strict';

var Bb = require('backbone');


var List = new Bb.Collection([], {
    comparator: 'dueDate',
});


module.exports = List;

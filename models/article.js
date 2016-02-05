'use strict';

var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({

    owner: String,
    author: String,
    title: String,
    body: String,
    created: {
        type: Date,
        default: Date.now()
    }

});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;

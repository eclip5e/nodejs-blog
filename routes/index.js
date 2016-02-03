var express = require('express');
var router = express.Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {

    Article.find(function (err, articles) {
        if (err) return console.error(err);

        console.log('-> INDEX PAGE ARTICLES:', articles);

        res.render('index', {
            title: 'Blog Application',
            userLoggedIn: req.isAuthenticated(),
            articles: articles
        });
    });

});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

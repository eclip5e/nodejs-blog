var router = require('express').Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/add', isLoggedIn, function(req, res) {
    res.render('article-add', { title: 'Create Article' });
});

router.post('/add', isLoggedIn, function(req, res) {

    var newArticle = new Article();

    newArticle.title = req.body.articleTitle;
    newArticle.body = req.body.articleBody;

    newArticle.save(function(err) {
        if (err)
            throw err;

        res.redirect('/');
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
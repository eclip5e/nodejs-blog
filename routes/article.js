var router = require('express').Router();
var Article = require('../models/article');

// GET | Article addition form.
router.get('/add', isLoggedIn, function(req, res) {
    res.render('article-add', { title: 'Create Article' });
});

// POST | Article addition form.
router.post('/add', isLoggedIn, function(req, res) {

    var newArticle = new Article();

    newArticle.owner = req.user._id;
    newArticle.author = req.user.local.username;
    newArticle.title = req.body.articleTitle;
    newArticle.body = req.body.articleBody;

    newArticle.save(function(err) {
        if (err) return console.error(err);

        res.redirect('/');
    });
});

// GET | Article page
router.get('/:id', function (req, res) {
    Article.findOne({ '_id': req.params.id }, function (err, article) {
        if (err) return console.error(err);

        var canEdit = req.user && (req.user.id === article.owner);

        res.render('article', {
            title: 'Blog Application',
            canEdit: canEdit,
            article: article
        });
    });
});

// DELETE | Article removal.
router.get('/:id/delete', isLoggedIn, function (req, res) {
    Article.findOneAndRemove({ '_id': req.params.id, owner: req.user._id }, function (err, article) {
        if (err) return console.error(err);

        res.redirect('/');
    })
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(403);
}
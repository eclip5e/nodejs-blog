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

        var canEdit = req.user && (req.user._id.equals(article.owner));

        res.render('article', {
            title: 'Blog Application',
            canEdit: canEdit,
            article: article
        });
    });
});

// GET | Article edit page.
router.get('/:id/edit', isLoggedIn, function (req, res) {
    Article.findOne({ '_id': req.params.id }, function (err, article) {
        if (err) return console.error(err);

        if (req.user._id.equals(article.owner)) {
            res.render('article-edit', {
                title: 'Edit Article',
                article: article
            });
        } else {
            res.send(403);
        }
    });
});

// POST | Article edit page.
router.post('/:id/edit', isLoggedIn, function (req, res) {
    Article.findOne({ '_id': req.params.id }, function (err, article) {
        if (err) return console.error(err);

        if (req.user._id.equals(article.owner)) {
            article.update({
                title: req.body.articleTitle,
                body: req.body.articleBody
            }).exec();

            res.redirect('/article/' + req.params.id);

        } else {
            res.send(403);
        }
    });
});

// DELETE | Article removal.
router.get('/:id/delete', isLoggedIn, function (req, res) {
    Article.findOne({ '_id': req.params.id }, function (err, article) {
        if (err) return console.error(err);

        if (req.user._id.equals(article.owner)) {
            article.remove();
            res.redirect('/');
        } else {
            res.send(403);
        }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(403);
}
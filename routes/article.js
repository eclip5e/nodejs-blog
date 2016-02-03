var router = require('express').Router();
var Article = require('../models/article');



/* GET Article addition form. */
router.get('/add', isLoggedIn, function(req, res) {
    res.render('article-add', { title: 'Create Article' });
});



router.post('/add', isLoggedIn, function(req, res) {

    var newArticle = new Article();

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

        res.send(article);
    });
    
});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
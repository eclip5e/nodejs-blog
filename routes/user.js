var express = require('express');
var router = express.Router();

/* GET User profile page. */
router.get('/', isLoggedIn, function(req, res) {
    res.render('profile', {
        user: req.user
    });
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
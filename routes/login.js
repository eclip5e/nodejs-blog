var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    /* GET login form. */
    router.get('/', function(req, res, next) {
        res.render('login', {title: 'Login Form'});
    });

    /* POST login form. */
    router.post('/', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));

    return router;
};

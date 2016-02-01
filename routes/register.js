var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    /* GET Registration form. */
    router.get('/', function(req, res, next) {
        res.render('register', {title: 'Create account form'});
    });

    /* POST Registration form. */
    router.post('/', passport.authenticate('local-signup', {
        successRedirect : '/account',
        failureRedirect : '/',
        failureFlash : true
    }));

    return router;

};

'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGN UP - Strategy configuration.

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {

        process.nextTick(function () {

            console.log('-> USERNAME:', username);
            console.log('-> PASSWORD:', password);

            User.findOne({'local.username': username }, function(err, user) {
                // if there are any errors, return the error
                if (err) return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.local.username = username;
                    newUser.local.password = newUser.generatePasswordHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });

        });

    }));

    // LOCAL LOG IN - Strategy configuration.

    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {

        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if the user is found but the password is wrong
            if (!user.validatePassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
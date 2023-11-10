const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require("../models/User");

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      bcrypt.compare(password, user.password).then(isEqual => {
        if(!isEqual) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    })
    })
    .catch(err => {
      console.log(err)
      return done(err);
    })
  })
);

passport.serializeUser((user, done) => { // To generate a token using user._id to send to the client as cookie
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => { // To remove server token
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

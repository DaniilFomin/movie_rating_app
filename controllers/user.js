const User = require('../models/User.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
  // local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        User.getUserByEmail(email, (error, user) => {
          if (error) {
            return done(error);
          }
          if (!user) {
            return done(null, false);
          }
          User.comparePassword(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false);
          });
          return true;
        });
      }
    )
  );

  // register a user
  app.post('/users/register', (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role || 'user';
    const newUser = new User({
      email,
      fullname,
      role,
      password,
    });
    User.createUser(newUser, (error, user) => {
      if (error) {
        res.status(422).json({
          message: 'Something went wrong. Please try again after some time!',
        });
      }
      res.send({ user });
    });
  });

  // Login a user
  app.post(
    '/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

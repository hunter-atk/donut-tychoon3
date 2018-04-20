const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-as-promised');

'use strict';

// NOTE: - Register Routes

router.get('/auth/register', function(req, res) {
  res.render('register')
});

router.post('/auth/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      req.session.user = user;
      res.redirect('/')
    })
    .catch((err) => {
      next(err);
    });
});

// NOTE: Login Routes

router.get('/auth/login', (req, res) => {
  res.render('login')
})

router.post('/auth/login', (req, res) => {
  knex('users')
  .where({email: req.body.email})
  .first()
  .then(user => {
    bcrypt.compare(req.body.password, user.hashed_password).then(function(result) {
      if (result == true){
        delete user.hashed_password;
        req.session.user = user;
        console.log('I logged in!');
        res.redirect('/')
      } else {
        console.log('Invalid password!');
        res.render('login', {error: 'Invalid password'})
      }
    });
  })
  .catch(err => {
    console.log('Invalid User.');
    res.render('login', {error: 'User does not exist.'})
  })
})

router.get('/auth/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/auth/login');
})

module.exports = router;

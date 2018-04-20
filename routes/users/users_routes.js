const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-as-promised');

'use strict';

router.get('/users/register', function(req, res) {
  res.render('register')
});

router.post('/users', (req, res, next) => {
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
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

module.exports = router;

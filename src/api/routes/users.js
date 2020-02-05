const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {

  // check that the user doesn't already exist
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length) {
        return res.status(409).json({
          message: 'User is already in the database.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });

  // hash password and save user in the database
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {

      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created.'
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });

    }
  });

});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: 'Authentication failed.' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Authentication failed.' });
        } else {
          if (result === true) {
            return res.status(200).json({ message: 'Auth successful.' });
          }
          res.status(401).json({ message: 'Authentication failed.' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
});

router.delete('/:userId', (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({ message: 'User deleted.' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
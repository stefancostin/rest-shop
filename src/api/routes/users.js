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
    if (user) {
      return res.status(409).json({
        message: 'User is already in the database.'
      });
    }
  })
  .catch(err => {
    res.status(500).json({ error: err });
  })

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
      })

    }
  });

});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:userId', auth, UserController.delete);

module.exports = router;
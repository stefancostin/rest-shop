const jwt = require('jsonwebtoken');
const config = require('../../config.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.userData = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Auth failed.' });
  }
  next();
};
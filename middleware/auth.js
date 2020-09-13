const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token ,Authorization denied' });
  }

  //Vefity the token
  try {
    const decoded = jwt.verify(token, config.get('jwtScret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    jwtConfig.secret,
    jwtConfig.options
  );
};

module.exports = generateToken;

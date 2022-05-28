const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const hashIt = function(data) {
  return crypto.createHash('sha256').update(data).digest('base64');
}

const sign = function(data) {
  console.log(config)
  return jwt.sign(data, config.secret, { algorithm: 'HS256' });
}

module.exports = {
  hashIt,
  sign,
};
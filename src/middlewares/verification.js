const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const response = require('../utils/response');

exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) {
    response.build(res, 403, false, null, 'No token provided!', null)
  } else {
    jwt.verify(token, secret.key, (err, decoded) => {
      if (err) {
        response.build(res, 401, false, null, 'Unauthorized', null)
      } else {
        next();
      }
    })
  }
};

exports.decodeToken = (req, res, next) => {
  let token = req.headers.authorization
  jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })
};
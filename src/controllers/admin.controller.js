const { Admin } = require('../db/models');
const bcrypt = require('bcryptjs');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
// const token = require('../middlewares/verification');

const hashPassword = (password) => bcrypt.hashSync(password, 10)
const checkPassword = (password, existPass) => bcrypt.compareSync(password, existPass);
const generateToken = (payload) => jwt.sign(payload, secret.key);

/*
#status (0 = inactive, 1 = active)
*/

exports.register = (req, res) => {
  const payload = {
    username: req.body.username,
    password: hashPassword(req.body.password),
    status: 1
  }
  if (payload.username === null || payload.username === '') {
    response.build(res, 400, false, null, 'Username cannot be empty', null)
  } else if (payload.password === null || payload.password === '') {
    response.build(res, 400, false, null, 'Password cannot be empty', null)
  } else {
    Admin.findOne({ where: { username: req.body.username } }).then((data) => {
      if (data) {
        response.build(res, 400, false, null, 'Username alredy existing', null)
      } else {
        Admin.create(payload).then(() => {
          response.build(res, 201, true, `New account created, successfuly`, null, null)
        }).catch((error) => {
          response.build(res, 500, false, `Failed to create account`, null, error.message)
        })
      }
    })
  }
};

exports.login = (req, res) => {
  if (req.body.username === null || req.body.username === '') {
    response.build(res, 400, false, null, 'Username cannot be empty', null)
  } else if (req.body.password === null || req.body.password === '') {
    response.build(res, 400, false, null, 'Password cannot be empty', null)
  } else {
    Admin.findOne({ where: { username: req.body.username } }).then((data) => {
      if(!data) {
        response.build(res, 404, false, null, 'Failed! Username Not found', null)
      } else if(!checkPassword(req.body.password, data.password)) {
        response.build(res, 401, false, null, 'Failed! Wrong Password', null)
      } else {
        const payload = {
          id: data.id,
          username: data.username,
          role: data.role
        }
        const user = {
          id: data.id,
          username: data.username,
          token: generateToken(payload)
        }
        response.build(res, 200, true, 'Logged in successfully', user, null)
      }
    }).catch((error) => {
      response.build(res, 500, false, `Failed`, null, error.message)
    })
  }
};


exports.update = (req, res) => {
  const payload = {
    username: req.body.username,
    Password: req.body.new_password,
    status: parseInt(req.body.status)
  }
  const oldPassword = req.body.old_password
  const token = req.headers.authorization
  const credential = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded
  })
  Admin.findOne({ where: { id: credential.id } }).then((data) => {
    if(!checkPassword(oldPassword, data.password)) {
      response.build(res, 401, false, null, 'Failed! Wrong Password', null)
    } else {
      Admin.update(payload, { where: { id: credential.id } }).then(() => {
        response.build(res, 201, true, `Account was updated successfully`, null, null)
      }).catch((err) => {
        response.build(res, 500, false, `Failed to update account`, null, err.message)
      })
    }
  })
};

const { question } = require('../db/models');
const response = require('../utils/response');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const token = req.headers.authorization
  const userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })
  const payload = { 
    content: req.body.content, 
    status: 1 ,
    admin_id: userId || req.body.admin_id,
    category_id: req.body.category_id
  }
  question.create(payload).then(() => {s
    response.created(res)
    }).catch(() => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const name = req.query.name
  if (name !== undefined) {
    question.findAll({ where: { name: name } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  } else if (status !== undefined) {
    question.findAll({ where: { status: status } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  } else {
    question.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  }
};

exports.getById = (req, res) => {
  const questionId = req.params.id
    question.findOne({ where: { id: questionId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const questionId = req.params.id
  const payload = {
    name: req.body.name,
    status: req.body.status
  }
  if (payload.status === undefined || payload.status === '') {
    question.update({ name: req.body.name, status: 1 }, { where: { id: questionId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  } else if (payload.name === undefined || payload.name === '') {
    question.update({ status: parseInt(req.body.status) }, { where: { id: questionId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  } else {
    question.update(payload, { where: { id: questionId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  }
};

const { category } = require('../db/models');
const response = require('../utils/response');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const payload = { name: req.body.name, status: 1 }
  category.create(payload).then(() => {
    response.build(res, 201, true, 'Category Created', null, null)
    }).catch(() => {
      response.build(res, 500, false, `Failed`, null, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const name = req.query.name
  if (name !== undefined) {
    category.findAll({ where: { name: name } }).then((data) => {
      response.build(res, 200, true, 'success', data, null)
      }).catch((error) => {
        response.build(res, 500, false, `Failed`, null, error.message)
      })
  } else if (status !== undefined) {
    category.findAll({ where: { status: status } }).then((data) => {
      response.build(res, 200, true, 'success', data, null)
      }).catch((error) => {
        response.build(res, 500, false, `Failed`, null, error.message)
      })
  } else {
    category.findAll().then((data) => {
      response.build(res, 200, true, 'success', data, null)
      }).catch((error) => {
        response.build(res, 500, false, `Failed`, null, error.message)
      })
  }
};

exports.getById = (req, res) => {
  const categoryId = req.params.id
    category.findOne({ where: { id: categoryId } }).then((data) => {
      response.build(res, 200, true, 'success', data, null)
      }).catch((error) => {
        response.build(res, 500, false, `Failed`, null, error.message)
      })
};

exports.update = (req, res) => {
  const categoryId = req.params.id
  const payload = {
    name: req.body.name,
    status: req.body.status
  }
  if (payload.status === undefined || payload.status === '') {
    category.update({ name: req.body.name, status: 1 }, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.build(res, 500, false, `Failed`, null, err.message)
    })
  } else if (payload.name === undefined || payload.name === '') {
    category.update({ status: parseInt(req.body.status) }, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.build(res, 500, false, `Failed`, null, err.message)
    })
  } else {
    category.update(payload, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.build(res, 500, false, `Failed`, null, err.message)
    })
  }
};

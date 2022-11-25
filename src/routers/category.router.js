const controller = require('../controllers/category.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/category/insert', controller.insert);
  router.get('/category', controller.get); // done
  router.get('/category/:id', controller.getById); // done
  router.put('/category/:id', controller.update); // done
};
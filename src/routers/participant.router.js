// const controller = require('../controllers/category.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/participant/insert', );
  router.get('/participant', );
  router.get('/participant/:id', );
  router.put('/participant/:id', ); // + delete
};
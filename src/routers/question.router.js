// const controller = require('../controllers/category.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/question/insert', );
  router.get('/question', );
  router.get('/question/:id', );
  router.put('/question/:id', ); // + delete

  router.post('/answer/insert', );
  router.get('/answer', );
  router.get('/answer/:id', );
  router.put('/answer/:id', ); // + delete
}
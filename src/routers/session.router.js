// const controller = require('../controllers/category.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/test-session/insert', );
  router.get('/test-session', );
  router.get('/test-session/:id', );
  router.put('/test-session/:id', ); // + delete
}
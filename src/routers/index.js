const router = require("express").Router();

require('./user.router')(router)
require('./admin.router')(router)
require('./category.router')(router)

module.exports = router;
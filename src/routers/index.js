const router = require("express").Router();

require('./user.router')(router)

module.exports = router;
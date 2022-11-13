const express = require('express');
const app = express();
const cors = require('cors');
const router = require('../src/routers');
const serverless = require('serverless-http');

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

module.exports = app
module.exports.handler = serverless(app)
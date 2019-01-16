const express = require('express');
const cohortsRouter = require('../cohorts/cohortsRouter');
const configureMiddleware = require('../config/middleware');

const server = express();
configureMiddleware(server);

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.use('/api/cohorts', cohortsRouter);


module.exports = server;

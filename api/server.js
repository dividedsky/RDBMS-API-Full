const express = require('express');
const cohortsRouter = require('../cohorts/cohortsRouter');

const server = express();

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.use('/api/cohorts', cohortsRouter);


module.exports = server;

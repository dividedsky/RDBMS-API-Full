const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('sanity check');
});

module.exports = server;

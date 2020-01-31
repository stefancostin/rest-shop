const express = require('express');
const app = express();

app.use((req, resp, next) => {
  resp.status(200).json({
    message: 'It works!'
  });
});

module.exports = app;
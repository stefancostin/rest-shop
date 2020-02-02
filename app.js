const express = require('express');
const morgan = require('morgan');

const productRoutes = require('./src/api/routes/products');
const orderRoutes = require('./src/api/routes/orders');

const app = express();

// Classic Middleware
// app.use((req, resp, next) => {
//   resp.status(200).json({
//     message: 'It works!'
//   });
// });
app.use(morgan('dev'));

// Middleware
// Format: app.use(FILTER, ROUTES)
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

/**
 * Error Handling - Creating the 404 Error
 */
app.use((req, res, next) => {
  const error = new Error('Resource not found.');
  error.status = 404;
  next(error);
});

/**
 * Error Handling - Handling all errors
 */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
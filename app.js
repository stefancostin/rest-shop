const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const productRoutes = require('./src/api/routes/products');
const orderRoutes = require('./src/api/routes/orders');

const app = express();

/**
 * Middleware for logging and parsing requests
 * The objects themselves call next()
 */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(morgan)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 
    'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/**
 * Middleware for API Routes 
 * Format: (FILTER, ROUTES)
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

/**
 * Error Handling - Route not matched
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
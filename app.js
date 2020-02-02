const express = require('express');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

// Classic Middleware
// app.use((req, resp, next) => {
//   resp.status(200).json({
//     message: 'It works!'
//   });
// });

// Middleware
// Format: app.use(FILTER, ROUTES)
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
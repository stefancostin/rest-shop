const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Products were fetched'
  })
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special Id',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an Id',
      id: id
    });
  }
});

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: 'Product was created',
    product: product
  })
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product updated'
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product deleted'
  });
});

module.exports = router;
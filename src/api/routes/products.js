const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {

      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            request: {
              method: 'GET',
              url: 'http://localhost:3000/products/' + doc._id,
            }
          };
        })
      }

      if (docs && docs.length) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'No entries found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No valid entry found for the provided id.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(result => {
      res.status(200).json({ product: result })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const key in req.body) {
    if (key !== '_id') {
      updateOps[key] = req.body[key];
    }
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ operation: result });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    })
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(res => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
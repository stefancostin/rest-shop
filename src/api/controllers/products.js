const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {

      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
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
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id productImage')
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
};

exports.createProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product.save()
    .then(result => {
      res.status(200).json({ product: result })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const key in req.body) {
    if (key !== '_id') {
      updateOps[key] = req.body[key];
    }
  }

  if (req.file && req.file.path) {
    updateOps.productImage = req.file.path;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ operation: result });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    })
};

exports.deleteProduct = (req, res, next) => {
  Product.remove({ _id: req.params.productId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
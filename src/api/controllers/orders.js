const Order = require('../models/order');
const Product = require('../models/product');

exports.ordersGetAll = (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            order: doc,
            request: {
              method: 'GET',
              url: 'http://localhost:3000/orders/' + doc._id
            }
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.getOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found.'
        });
      }
      res.status(200).json({
        order: order,
        request: {
          method: 'GET',
          url: 'http://localhost:3000/orders/' + order._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
};

exports.createOrder = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found.'
        });
      }

      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });

      return order.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Order stored.',
        order: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          method: 'GET',
          url: 'http://localhost:3000/orders/' + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted.',
        request: {
          method: 'POST',
          url: 'http://localhost:3000/orders',
          body: { productId: 'id', quantity: '' }
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
};
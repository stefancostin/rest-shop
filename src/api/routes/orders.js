const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const OrderController = require('../controllers/orders');

router.get('/', auth, OrderController.ordersGetAll);

router.get('/:orderId', auth, OrderController.getOrder);

router.post('/', auth, OrderController.createOrder);

router.delete('/:orderId', auth, OrderController.deleteOrder);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const OrdersController = require('../controllers/orders');

router.get('/', auth, OrdersController.ordersGetAll);

router.get('/:orderId', auth, OrdersController.getOrder);

router.post('/', auth, OrdersController.createOrder);

router.delete('/:orderId', auth, OrdersController.deleteOrder);

module.exports = router;
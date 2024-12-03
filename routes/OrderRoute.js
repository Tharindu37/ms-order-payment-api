const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');

// Place a new order
router.post('/orders', OrderController.placeOrder);

// Load all orders
router.get('/orders', OrderController.loadAllOrders);

// Update an order's state
router.put('/orders/:orderId', OrderController.updateOrderState);

// Delete an order by admin
router.delete('/orders/:orderId', OrderController.deleteOrderByAdmin);

module.exports = router;
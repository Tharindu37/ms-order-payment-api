const OrderSchema = require('../models/OrderSchema');

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const order = new OrderSchema(req.body);
        const savedOrder = await order.save();
        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to place order', error });
    }
};

// Load all orders
const loadAllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to load orders', error });
    }
};

// Update order state
const updateOrderState = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { state } = req.body;

        const updatedOrder = await OrderSchema.findByIdAndUpdate(orderId, { state }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update order state', error });
    }
};

// Delete an order by admin
const deleteOrderByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await OrderSchema.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete order', error });
    }
};

module.exports = {
    placeOrder,
    loadAllOrders,
    updateOrderState,
    deleteOrderByAdmin,
};

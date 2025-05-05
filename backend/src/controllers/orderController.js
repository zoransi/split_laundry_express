const Order = require('../models/Order');
const { validateOrder } = require('../utils/validation');

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const order = new Order(req.body);
    await order.save();

    // Emit order created event
    const io = req.app.get('io');
    io.emit('order_created', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    // Emit order status update event
    const io = req.app.get('io');
    io.to(`order_${order._id}`).emit('order_status_updated', {
      orderId: order._id,
      status: order.status,
      updatedAt: order.updatedAt
    });

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'DELIVERED') {
      return res.status(400).json({ message: 'Cannot cancel a delivered order' });
    }

    order.status = 'CANCELLED';
    await order.save();

    // Emit order cancelled event
    const io = req.app.get('io');
    io.to(`order_${order._id}`).emit('order_cancelled', {
      orderId: order._id,
      status: order.status,
      updatedAt: order.updatedAt
    });

    res.json(order);
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
}; 
const Order = require("../models/Orders");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/products");
// Create and Save a new Order

const createNewOrder = async (req, res) => {
  try {
    const { shippingAddress, orderItems, paymentMethod, user, totalPrice } =
      req.body;
    console.log(req.body);
    const order = new Order({
      user,
      shippingAddress,
      orderItems,
      paymentMethod,

      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get single order details

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all orders -- Admin

const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({ success: true, totalAmount, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// change order Status -- Admin
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }

    await Promise.all(order.orderItems.map(async (item) => {
      await updateStock(item.product, item.quantity);
    }));

    order.orderStatus = req.body.status;
    if (order.orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateStock(id, quantity) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      console.error(`Product not found for id: ${id}`);
      throw new Error(`Product not found for id: ${id}`);
    }
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
  } catch (error) {
    console.error(`Error updating stock for product id: ${id}`, error);
    throw error;
  }
}
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      next(new ErrorHandler("order not found", 404));
    }
    await order.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  deleteOrder,
  updateOrder,
};

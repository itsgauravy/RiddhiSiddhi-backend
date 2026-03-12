const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalRevenue = 0;

    orders.forEach(order => {
      totalRevenue += order.totalAmount;
    });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRecentOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTopProducts = async (req, res) => {
  try {

    const orders = await Order.find();

    const productSales = {};

    orders.forEach(order => {
      order.items.forEach(item => {

        const id = item.product.toString();

        if (!productSales[id]) {
          productSales[id] = 0;
        }

        productSales[id] += item.quantity;

      });
    });

    const sorted = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.json(sorted);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
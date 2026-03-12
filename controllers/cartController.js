const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // STOCK CHECK
    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity not available in stock"
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {

      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {

        const newQuantity = cart.items[itemIndex].quantity + quantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            message: "Stock limit exceeded"
          });
        }

        cart.items[itemIndex].quantity = newQuantity;

      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getCart = async (req, res) => {
  try {

    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
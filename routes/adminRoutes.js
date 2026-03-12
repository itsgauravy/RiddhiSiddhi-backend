const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
  getTopProducts
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);

router.get("/recent-orders", authMiddleware, adminMiddleware, getRecentOrders);

router.get("/top-products", authMiddleware, adminMiddleware, getTopProducts);

module.exports = router;
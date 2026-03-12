const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const staffMiddleware = require("../middleware/staffMiddleware");

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);

// Staff + Admin routes
router.get("/admin", authMiddleware, staffMiddleware, getAllOrders);

router.put(
  "/:id/status",
  authMiddleware,
  staffMiddleware,
  updateOrderStatus
);

module.exports = router;
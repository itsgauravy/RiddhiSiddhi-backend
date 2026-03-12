const express = require("express");
const router = express.Router();

const { updateUserRole } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.put(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole
);

module.exports = router;
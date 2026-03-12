const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("RiddhiSiddhi API running");
});

const PORT = process.env.PORT || 5000;

const categoryRoutes = require("./routes/categoryRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    userId: req.user.id
  });
});
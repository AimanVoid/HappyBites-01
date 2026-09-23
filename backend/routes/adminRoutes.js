import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        message: "Admin account is inactive",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

router.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin"),
  async (req, res) => {
    try {
      const admins = await Admin.find().select("-password");

      res.json(admins);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch admins",
        error: error.message,
      });
    }
  },
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const productCount = await Product.countDocuments();
      const orderCount = await Order.countDocuments();
      const customerCount = await User.countDocuments();

      const newMessageCount = await ContactMessage.countDocuments({
        status: "new",
      });

      const pendingOrderCount = await Order.countDocuments({
        status: "pending",
      });
      
      const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("customer totalAmount status createdAt");

      res.json({
        products: productCount,
        orders: orderCount,
        customers: customerCount,
        newMessages: newMessageCount,
        pendingOrders: pendingOrderCount,
        recentOrders,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch dashboard statistics",
        error: error.message,
      });
    }
  },
);

export default router;

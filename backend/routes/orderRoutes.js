import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Settings from "../models/Settings.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET all orders
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  },
);

// GET a single order
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({
        message: "Invalid order ID",
        error: error.message,
      });
    }
  },
);

router.post("/", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { customer, items, paymentMethod = "COD" } = req.body;

    // Basic validation
    if (!customer?.name || !customer?.phone || !customer?.address) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Customer name, phone and address are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Order must contain at least one product.",
      });
    }

    const verifiedItems = [];
    let subtotalAmount = 0;

    // Get current delivery charges from admin settings
    const settings = await Settings.findOne().session(session);

    const deliveryCharges = Number(settings?.deliveryCharges || 0);

    for (const item of items) {
      if (!item.productId || !item.quantity) {
        await session.abortTransaction();

        return res.status(400).json({
          message: "Invalid order item.",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        await session.abortTransaction();

        return res.status(400).json({
          message: "Product quantity must be at least 1.",
        });
      }

      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        await session.abortTransaction();

        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (!product.isActive) {
        await session.abortTransaction();

        return res.status(400).json({
          message: `${product.name} is currently unavailable.`,
        });
      }

      if (product.stock < quantity) {
        await session.abortTransaction();

        return res.status(400).json({
          message: `Not enough stock for ${product.name}.`,
        });
      }

      const subtotal = product.price * quantity;

      verifiedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        subtotal,
      });

      subtotalAmount += subtotal;
    }

      const totalAmount = subtotalAmount + deliveryCharges;

    // Atomically reduce stock
    for (const item of verifiedItems) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!updatedProduct) {
        await session.abortTransaction();

        return res.status(400).json({
          message: `Not enough stock for ${item.name}.`,
        });
      }
    }

    // Create order inside the same transaction
    const order = new Order({
      customer,
      items: verifiedItems,
      totalAmount,
      paymentMethod,
    });

    // Create or update customer
    let user = await User.findOne({
      phone: customer.phone,
    }).session(session);

    if (user) {
      user.name = customer.name;
      user.address = customer.address;

      await user.save({ session });
    } else {
      user = await User.create(
        [
          {
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            email: "",
          },
        ],
        { session },
      );

      user = user[0];
    }

    const savedOrder = await order.save({ session });

    // Everything succeeded
    await session.commitTransaction();

    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();

    console.error("Order creation failed:", error);

    res.status(400).json({
      message: "Failed to create order",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

// UPDATE an order
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({
        message: "Failed to update order",
        error: error.message,
      });
    }
  },
);

// DELETE an order
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);

      if (!deletedOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json({
        message: "Order deleted successfully",
        order: deletedOrder,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to delete order",
        error: error.message,
      });
    }
  },
);

export default router;

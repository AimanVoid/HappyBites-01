import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// GET a single user
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Invalid user ID",
      error: error.message,
    });
  }
});

// CREATE a user
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const user = new User(req.body);

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// UPDATE a user
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
});

// DELETE a user
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

export default router;
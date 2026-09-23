import express from "express";
import Category from "../models/Category.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
});

// GET a single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Invalid category ID",
      error: error.message,
    });
  }
});

// CREATE a category
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const category = new Category(req.body);

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
});



// UPDATE a category
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
});


// DELETE a category
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
});



export default router;
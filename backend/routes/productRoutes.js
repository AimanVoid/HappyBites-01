import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});



// GET a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID",
      error: error.message,
    });
  }
});


// UPDATE a product
router.put("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});



router.patch(
  "/:id/stock",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const { stock } = req.body;

      if (stock === undefined) {
        return res.status(400).json({
          message: "Stock is required",
        });
      }

      if (typeof stock !== "number" || stock < 0) {
        return res.status(400).json({
          message: "Stock must be a number greater than or equal to 0",
        });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { stock },
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message: "Stock updated successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update stock",
        error: error.message,
      });
    }
  }
);



// DELETE a product
router.delete("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});




// POST a new product
router.post("/", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});

export default router;
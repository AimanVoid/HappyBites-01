import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET all contact messages
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
});

// GET a single contact message
router.get("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json(message);
  } catch (error) {
    res.status(400).json({
      message: "Invalid contact message ID",
      error: error.message,
    });
  }
});

// CREATE a contact message
router.post("/", async (req, res) => {
  try {
    const message = new ContactMessage(req.body);

    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create contact message",
      error: error.message,
    });
  }
});

// UPDATE a contact message
router.put("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update contact message",
      error: error.message,
    });
  }
});

// DELETE a contact message
router.delete("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json({
      message: "Contact message deleted successfully",
      contactMessage: deletedMessage,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete contact message",
      error: error.message,
    });
  }
});

export default router;
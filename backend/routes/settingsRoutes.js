import express from "express";
import Settings from "../models/Settings.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get public settings
router.get("/public", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({
      businessName: settings.businessName,
      whatsappNumber: settings.whatsappNumber,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      deliveryCharges: settings.deliveryCharges,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch public settings",
      error: error.message,
    });
  }
});

// Get settings
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      let settings = await Settings.findOne();

      if (!settings) {
        settings = await Settings.create({});
      }

      res.json(settings);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch settings",
        error: error.message,
      });
    }
  },
);

// Update settings
router.put(
  "/",
  authMiddleware,
  roleMiddleware("admin", "superadmin"),
  async (req, res) => {
    try {
      const settings = await Settings.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        runValidators: true,
      });

      res.json({
        message: "Settings updated successfully",
        settings,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update settings",
        error: error.message,
      });
    }
  },
);

export default router;

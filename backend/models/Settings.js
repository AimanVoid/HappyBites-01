import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "HappyBites",
      trim: true,
    },

    whatsappNumber: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    deliveryCharges: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
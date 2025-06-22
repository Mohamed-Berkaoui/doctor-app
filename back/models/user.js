const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "No description provided" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
    role: { type: String, enum: ["user", "doctor","admin"], default: "doctor" },
    specialty: {
      type: String,
      default: "general",
      enum: ["general", "cardiology", "neurology", "orthopedics"],
    },
    workingHours: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },
    workingDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;

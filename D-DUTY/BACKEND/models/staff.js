const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "must required user name"],
      trim: true,
      maxlength: [20, "username must be within 20 characters"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "must required name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "must required password"],
      trim: true,
      minlength: [8, "upassword atleast have 8 characters"],
    },
    email: {
      type: String,
      required: [true, "must required email"],
      trim: true,
      unique: true,
    },
    deg: {
      type: String,
      required: [true, "must required Degignation"],
    },
    role: { type: String, required: true },
    regBy: { type: String, required: true },
    alert: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);

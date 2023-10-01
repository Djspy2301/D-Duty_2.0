const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "must required user name"],
      trim: true,
      maxlength: [20, "username must be within 20 characters"],
      unique: true,
    },
    org: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "must required name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "must required email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "must required password"],
      trim: true,
      minlength: [8, "upassword atleast have 8 characters"],
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);

const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    notifyTo: { type: String, required: true },

    issue: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);

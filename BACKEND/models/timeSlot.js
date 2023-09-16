const mongoose = require("mongoose");
const staff = require("./staff");

const TimeSlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  regBy: { type: String, required: true },
  // staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  staff: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      user: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      deg: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);

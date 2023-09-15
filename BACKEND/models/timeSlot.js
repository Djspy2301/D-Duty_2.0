const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  regBy: { type: String, required: true },
});

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);

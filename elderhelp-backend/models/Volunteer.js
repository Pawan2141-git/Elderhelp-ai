const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  skills: String,
  availability: String,
  availableTime: Date, // ✅ NEW FIELD for fixed time slot
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);

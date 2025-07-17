const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  need: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);

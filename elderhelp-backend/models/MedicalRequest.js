const mongoose = require("mongoose");

const MedicalRequestSchema = new mongoose.Schema(
  {

    name: { type: String, required: true },
    age: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    medicineName: { type: String, required: true },
    prescription: { type: String, required: true },
    urgency: { type: String, default: "Normal" },
    additionalNotes:{ type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRequest", MedicalRequestSchema);

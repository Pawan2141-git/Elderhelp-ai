const mongoose = require("mongoose");

const MedicalRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    medicines: { type: String, required: true },
    deliveryTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRequest", MedicalRequestSchema);

const express = require("express");
const router = express.Router();
const MedicalRequest = require("../models/MedicalRequest");

// POST - Create request
router.post("/", async (req, res) => {
  try {
    const newRequest = new MedicalRequest(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - All requests
router.get("/", async (req, res) => {
  try {
    const data = await MedicalRequest.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - One request
router.delete("/:id", async (req, res) => {
  try {
    await MedicalRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Medicine request deleted" });
  } catch (err) {
    res.status(500).json({ error: "❌ Error deleting medicine request" });
  }
});

module.exports = router;

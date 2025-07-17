const express = require("express");
const router = express.Router();
const HelpRequest = require("../models/HelpRequest");

// POST /api/help - Submit a new request
router.post("/", async (req, res) => {
  try {
    const help = new HelpRequest(req.body);
    await help.save();
    res.status(201).json(help);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/help - Get all help requests
router.get("/", async (req, res) => {
  try {
    const data = await HelpRequest.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/help/:id - Delete a specific help request
router.delete("/:id", async (req, res) => {
  try {
    await HelpRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ error: "❌ Error deleting data" });
  }
});

module.exports = router;

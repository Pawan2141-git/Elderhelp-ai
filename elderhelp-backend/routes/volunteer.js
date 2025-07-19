const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// ✅ POST - Register a volunteer
router.post("/", async (req, res) => {
  try {
    const { name, phone, city, skills, availability, availableTime } = req.body;

    const volunteer = new Volunteer({
      name,
      phone,
      city,
      skills,
      availability,
      availableTime, // ✅ save time
    });

    await volunteer.save();
    res.status(201).json({ message: "✅ Volunteer registered!" });
  } catch (error) {
    console.error("❌ Volunteer POST error:", error);
    res.status(500).json({ error: "❌ Error registering volunteer." });
  }
});

// ✅ GET - Fetch all volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    console.error("❌ Volunteer GET error:", error);
    res.status(500).json({ error: "❌ Error fetching volunteers." });
  }
});

// ✅ DELETE - Delete a volunteer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findByIdAndDelete(id);
    
    if (!volunteer) {
      return res.status(404).json({ error: "❌ Volunteer not found." });
    }
    
    res.json({ message: "✅ Volunteer deleted successfully!" });
  } catch (error) {
    console.error("❌ Volunteer DELETE error:", error);
    res.status(500).json({ error: "❌ Error deleting volunteer." });
  }
});

module.exports = router;

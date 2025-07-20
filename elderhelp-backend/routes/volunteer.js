const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// ✅ POST - Register a volunteer
router.post("/", async (req, res) => {
  try {
    const name = req.body.name? req.body.name:"";
     const phone  = req.body.phone ? req.body.phone:"";
      const city = req.body.city ? req.body.city:"";
      const skills = req.body.skills ?req.body.skills:"";
      const availability =  req.body.availability ?req.body.availability:"";
     const availableTime =  req.body.availableTime? req.body.availableTime:"";

    
     const volunteer = new Volunteer({
      // ✅ save timename && name,
      phone,
      city,
      skills,
      availability,
      availableTime, 
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

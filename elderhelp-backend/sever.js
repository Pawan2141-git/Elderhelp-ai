const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require('./config/mongodb.js');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend (if using public folder for static build)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/api/help", require("./routes/help"));
app.use("/api/volunteer", require("./routes/volunteer"));
app.use("/api/medicine", require("./routes/medicine")); // ✅ 👈 Add this line for medicine requests

// ✅ Default Route
app.get("/", (req, res) => {
  res.send('Welcome to ElderHelp.ai API');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

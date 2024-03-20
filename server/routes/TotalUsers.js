// Assuming you have a router setup for handling student-related routes
const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // Import your Mongoose Student model

// Route to get total number of students
// View students count route
router.get("/students/count", async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    res.status(200).json({ count: studentCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

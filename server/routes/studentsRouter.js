const express = require("express");
const router = express.Router();
const path = require("path");

const Student = require("../models/Student");

// Add new student route without image upload
router.post("/addStudents", async (req, res) => {
  try {
    const newStudent = new Student({
      studentName: req.body.studentName,
      studentFatherName: req.body.studentFatherName,
      jamiaMoney: req.body.jamiaMoney,
      studentIdCard: req.body.studentIdCard,

      studentDOB: req.body.studentDOB,
      guardianName: req.body.guardianName,
      guardianIdCard: req.body.guardianIdCard,
      fatherOccupasion: req.body.fatherOccupasion,
      currentAddress: req.body.currentAddress,
      city: req.body.city,
      province: req.body.province,
      studentContact: req.body.studentContact,
      guardianContact: req.body.guardianContact,
      contemporaryEducation: req.body.contemporaryEducation,
      dateEntryLunar: req.body.dateEntryLunar,
      solarEntryDate: req.body.solarEntryDate,
      renewalAdmission: req.body.renewalAdmission,
      residential: req.body.residential,
      oldSchool: req.body.oldSchool,
      molarity: req.body.molarity,
      studentPosition: req.body.studentPosition,
    });

    const saveStudent = await newStudent.save();
    res.json(saveStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// View students route
router.get("/viewStudents", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teachers');

router.post('/addTeacher', async (req, res) => {
  try {
    const newTeacher = new Teacher({
      teacherName: req.body.teacherName,
      teacherFatherName: req.body.teacherFatherName,
      teacherPosition: req.body.teacherPosition,
      teacherDOB:req.body. teacherDOB,
      teacherIdCard:req.body.teacherIdCard,
      currentAddress:req.body.currentAddress,
      city:req.body.city,
      province:req.body.province,
      contact:req.body.contact,
      appointmentDate:req.body.appointmentDate,
      advertising:req.body.advertising,
      email:req.body.Email,
      residential:req.body.residential,
      
    });

    const saveTeacher = await newTeacher.save();
    res.json(saveTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/viewTeachers',async(req,res)=>{
  try {
    const teachers = await Teacher.find()
    res.status(200).json(teachers)
  } catch (error) {
    res.status(500).json({"error":error})
  }
})

module.exports = router;

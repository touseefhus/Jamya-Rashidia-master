const express = require('express');
const router = express.Router();

const Employer = require('../models/Employers');

// Route to add a new employer
router.post('/addEmployer', async (req, res) => {
  try {
    // Validate the incoming request body
    const { employersName, employersFatherName, employersPosition, employersDOB, employersIdCard, currentAddress, contact, appointmentDate, advertising, Email } = req.body;
    // if (!employersName || !employersPosition || !currentAddress || !contact || !appointmentDate || !Email || !residential) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    // Create a new employer instance
    const newEmployer = new Employer({
      employersName:req.body.employersName,
      employersFatherName:req.body.employersFatherName,
      employersPosition:req.body.employersPosition,
      employersDOB:req.body.employersDOB,
      employersIdCard:req.body.employersIdCard,
      currentAddress:req.body.currentAddress,
      city:req.body.city,
      province:req.body.province,
      contact:req.body.contact,
      appointmentDate:req.body.appointmentDate,
      advertising:req.body.advertising,
      Email:req.body.Email,
      residential:req.body.residential
    });

    // Save the employer to the database
    const savedEmployer = await newEmployer.save();
    
    // Send back the saved employer as a response
    res.status(201).json(savedEmployer);
  } catch (error) {
    console.error('Error adding employer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to view all employers
router.get('/viewEmployers', async (req, res) => {
  try {
    // Fetch all employers from the database
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

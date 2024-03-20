const mongoose = require("mongoose");

const employersSchema = new mongoose.Schema({
  employersName: {
    type: String,
    required: true,
  },
  employersFatherName: {
    type: String,
    required: true,
  },
  employersPosition: {
    type: String,
    required: true,
  },
  employersDOB: {
    type: Date,
    required: true,
  },
  employersIdCard: {
    type: Number,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  advertising: {
    type: String,
    required: true,
  },
  residential: {
    type: Boolean,
    required: false,
  },
  Email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employers_Data", employersSchema);

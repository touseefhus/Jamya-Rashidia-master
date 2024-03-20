const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  teacherFatherName: {
    type: String,
    required: true,
  },
  teacherPosition: {
    type: String,
    required: true,
  },
  teacherDOB: {
    type: Date,
    required: true,
  },
  teacherIdCard: {
    type: Number,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
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
  email: {
    type: String,
    required: true,
  },
  residential: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("form_data", teacherSchema);

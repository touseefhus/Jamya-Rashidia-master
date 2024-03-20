const mongoose = require("mongoose");
let shallValidate = false;

const provinces = ["Punjab", "Sindh", "KPK", "Balouchistan"];

const studentsSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: shallValidate,
  },
  studentFatherName: {
    type: String,
    required: shallValidate,
  },
  jamiaMoney: {
    type: Number,
    required: shallValidate,
  },
  studentIdCard: {
    type: Number,
    required: shallValidate,
  },
  studentPic: {
    data: Buffer,
    contentType: String,
  },
  studentDOB: {
    type: Date,
    required: shallValidate,
  },
  guardianName: {
    type: String,
    required: shallValidate,
  },
  guardianIdCard: {
    type: Number,
    required: shallValidate,
  },
  fatherOccupation: {
    type: String,
    required: shallValidate,
  },
  currentAddress: {
    type: String,
    required: shallValidate,
  },
  studentContact: {
    type: Number,
    required: shallValidate,
  },
  guardianContact: {
    type: Number,
    required: shallValidate,
  },
  contemporaryEducation: {
    type: String,
    required: shallValidate,
  },
  dateEntryLunar: {
    type: Date,
    required: shallValidate,
  },
  solarEntryDate: {
    type: Date,
    required: shallValidate,
  },
  renewalAdmission: {
    type: String,
    required: shallValidate,
  },
  oldSchool: {
    type: String,
    required: shallValidate,
  },
  molarity: {
    type: String,
    required: shallValidate,
  },
  studentPosition: {
    type: String,
    required: shallValidate,
  },
  province: {
    type: String,
    enum: provinces,
    required: shallValidate,
  },
  city: {
    type: String,
    required: shallValidate,
  },
});

module.exports = mongoose.model("student_data", studentsSchema);

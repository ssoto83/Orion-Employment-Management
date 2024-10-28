const mongoose = require("mongoose");
const TimeOffRequest = require('./TimeOffRequest')
// Employee Model
/* const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  timeOffRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "timeOffRequests"
  }]
});
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee; */

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  timeOffRequests: [TimeOffRequest]
});
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
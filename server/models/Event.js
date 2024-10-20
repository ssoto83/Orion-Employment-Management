const mongoose = require("mongoose");
const { eventNames } = require("process");

// Employee Model
const eventSchema = new mongoose.Schema({
  eventNames: {
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
});
// const Employee = mongoose.model("Employee", employeeSchema);
// module.exports = Employee;

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
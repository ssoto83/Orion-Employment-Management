const mongoose = require("mongoose");

// TimeOffRequest Model
const timeOffRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
});
const TimeOffRequest = mongoose.model("TimeOffRequest", timeOffRequestSchema);
module.exports = TimeOffRequest;

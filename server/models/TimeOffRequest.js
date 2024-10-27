const mongoose = require("mongoose");

// TimeOffRequest Model
const timeOffRequestSchema = new mongoose.Schema({
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
/* const TimeOffRequest = mongoose.model("timeOffRequest", timeOffRequestSchema); */
module.exports = timeOffRequestSchema;

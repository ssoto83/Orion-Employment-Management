const mongoose = require("mongoose");
require("dotenv").config();
console.log("env file", process.env.CONNECTION_STRING);
mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTION_STRING);

module.exports = mongoose.connection;

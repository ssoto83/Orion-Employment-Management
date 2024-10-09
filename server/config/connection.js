const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTION_STRING)

module.exports = mongoose.connection
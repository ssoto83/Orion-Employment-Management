// const mongoose = require('mongoose');
// require('dotenv').config();
// console.log('env file', process.env.CONNECTION_STRING);
// mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTION_STRING);
// modified by Rachel 10.17.24
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/orionDB'
);

module.exports = mongoose.connection;

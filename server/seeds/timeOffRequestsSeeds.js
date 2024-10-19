// seeds/timeOffRequestsData.js
const mongoose = require('mongoose');
const db = require('../config/connection');
const TimeOffRequest = require('../models/TimeOffRequest');

const timeOffRequestData = [
  {
    employeeId: 'employeeId1', // replace with actual employee ID
    startDate: '2024-05-01T00:00:00Z',
    endDate: '2024-05-05T00:00:00Z',
    status: 'Approved',
  },
  {
    employeeId: 'employeeId2', // replace with actual employee ID
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-06-03T00:00:00Z',
    status: 'Pending',
  },
  {
    employeeId: 'employeeId3', // replace with actual employee ID
    startDate: '2024-07-10T00:00:00Z',
    endDate: '2024-07-15T00:00:00Z',
    status: 'Denied',
  },
];

// Seed the database
const seedTimeOffRequests = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/orion-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await TimeOffRequest.deleteMany({});
    await TimeOffRequest.insertMany(eventData);

    console.log('Time off request seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding time off requests:', error);
    mongoose.connection.close();
  }
};

seedTimeOffRequests();

module.exports = timeOffRequestData;

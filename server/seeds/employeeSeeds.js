const mongoose = require('mongoose');
const Employee = require('../models/Employee'); // Assuming you have this model in place
const db = require('../config/connection');

// Example seed data for employees
const employeeData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '123 Elm St',
    phoneNumber: '555-1234',
    position: 'Software Engineer',
    ssn: '123-45-6789',
    pay: 75000,
    startDate: new Date('2021-01-15'),
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    address: '456 Oak St',
    phoneNumber: '555-5678',
    position: 'Product Manager',
    ssn: '987-65-4321',
    pay: 95000,
    startDate: new Date('2020-09-01'),
  },
];

db.once('open', async () => {
  try {
    await Employee.deleteMany({}); // Clear existing employees
    await Employee.insertMany(employeeData); // Insert seed data

    console.log('Employees seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

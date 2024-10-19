const mongoose = require('mongoose');
const Employee = require('../models/Employee'); // Assuming you have this model in place
const db = require('../config/connection');


// Example seed data for employees

const employeeData = [
    {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      phoneNumber: "555-555-5555",
      email: "john.doe@example.com",
      ssn: "123-45-6789",
      position: "Software Engineer",
      pay: 90000,
      startDate: "2022-01-01T00:00:00Z",
      isActive: true,
      isAdmin: false
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Elm St",
      phoneNumber: "555-555-5556",
      email: "jane.smith@example.com",
      ssn: "987-65-4321",
      position: "Product Manager",
      pay: 95000,
      startDate: "2022-06-15T00:00:00Z",
      isActive: true,
      isAdmin: false
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      address: "789 Maple St",
      phoneNumber: "555-555-5557",
      email: "emily.johnson@example.com",
      ssn: "123-45-6780",
      position: "UX Designer",
      pay: 85000,
      startDate: "2023-03-01T00:00:00Z",
      isActive: true,
      isAdmin: false
    }
    {
      firstName: "Kimiko",
      lastName: "Doe",
      address: "123 Main St",
      phoneNumber: "555-555-5555",
      email: "kimiko@example.com",
      ssn: "123-45-6789",
      position: "Software Engineer",
      pay: 90000,
      startDate: "2022-01-01T00:00:00Z",
      isActive: true,
      isAdmin: true
    },
    {
      firstName: "Zain",
      lastName: "Doe",
      address: "456 Pecan St",
      phoneNumber: "555-555-5556",
      email: "zain@example.com",
      ssn: "987-65-4321",
      position: "Product Manager",
      pay: 95000,
      startDate: "2022-06-15T00:00:00Z",
      isActive: true,
      isAdmin: true
    },
    {
      firstName: "Susana",
      lastName: "Doe",
      address: "789 Maple St",
      phoneNumber: "555-555-5557",
      email: "susana@example.com",
      ssn: "123-45-6780",
      position: "UX Designer",
      pay: 85000,
      startDate: "2023-03-01T00:00:00Z",
      isActive: true,
      isAdmin: true
      
    }
    {
      firstName: "Rachel",
      lastName: "Doe",
      address: "3001 Robinhood St",
      phoneNumber: "555-555-5557",
      email: "rachel@example.com",
      ssn: "123-45-6780",
      position: "UX Designer",
      pay: 85000,
      startDate: "2023-03-01T00:00:00Z",
      isActive: true,
      isAdmin: true
    }
  ];


  // Seed the database
const employeeSeeds = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/orion-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Employees.deleteMany({});
    await Employees.insertMany(eventData);

    console.log('Employees seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding employees:', error);
    mongoose.connection.close();
  }
};

seedEmployees();

  
  module.exports = employeeData;
  
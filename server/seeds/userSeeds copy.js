const mongoose = require('mongoose');
const Employee = require('../models/Employee'); // Assuming you have this model in place
const db = require('../config/connection');


// Example seed data for employees

const employeeData = [
    {
        username: "johndoe",
        password: "password123",
        isAdmin: true,
    },
    {
        username: "janesmith",
        password: "password123",
        isAdmin: false,
    },

    {
        username: "emilyjohnson",
        password: "password123",
        isAdmin: true,
    },
    {
        username: "kimiko",
        password: "password123",
        isAdmin: true,
    },
    {
        username: "zain",
        password: "password123",
        isAdmin: true,
    },

    {
        username: "johndoe",
        password: "password123",
        isAdmin: true,
    },
    {
        username: "susana",
        password: "password123",
        isAdmin: true,
    },
    {
        username: "johndoe",
        password: "password123",
        isAdmin: true,
    },
    {
      firstName: "Rachel",
      lastName: "Doe",
      address: "3001 Robinhood St",
      phoneNumber: "555-555-5557",
      email: "rachel@example.com",
      ssn: "323-45-6780",
      position: "UX Designer",
      pay: 85000,
      startDate: "2023-03-01T00:00:00Z",
      isActive: true,
      isAdmin: true
    }
  ];


  // Seed the database
// const employeeSeeds = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/orion-management', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     await Employee.deleteMany({});
//     await Employee.insertMany(eventData);

//     console.log('Employees seeded successfully!');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding employees:', error);
//     mongoose.connection.close();
//   }
// };

// employeeSeeds();

const seedEmployees = async () => {
  try {
    await db; // Ensure you're using your db connection defined in your config
    await Employee.deleteMany({});
    await Employee.insertMany(employeeData);

    console.log('Employees seeded successfully!');
  } catch (error) {
    console.error('Error seeding employees:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedEmployees();
  
  module.exports = employeeData;
  
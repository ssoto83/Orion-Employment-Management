const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming you have this model in place
const db = require('../config/connection');

// Example seed data for employees

const userData =
[
  {
    username: 'johndoe',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'janesmith',
    password: 'password123',
    isAdmin: false,
  },

  {
    username: 'emilyjohnson',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'kimiko',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'zain',
    password: 'password123',
    isAdmin: true,
  },

  {
    username: 'johndoe',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'susana',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'johndoe',
    password: 'password123',
    isAdmin: true,
  },
  {
    username: 'rachel',
    password: 'password123',
    isAdmin: true,
  },
];

Seed the database
const userSeeds = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/orion-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await User.insertMany(eventData);

    console.log('Users seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

userSeeds();

const seedUser = async () => {
  try {
    await db; // Ensure you're using your db connection defined in your config
    await User.deleteMany({});
    await User.insertMany(employeeData);

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();

module.exports = userData;

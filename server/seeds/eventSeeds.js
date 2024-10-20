// Initiate the MongoDB connection and seed the database with event data
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Example seed data for events
const eventData = [
  {
    name: 'Annual Company Retreat',
    date: ('2025-03-15'),
    description:
      'A week-long retreat to relax and collaborate with team members in a serene environment.',
    photo: 'https://www.example.com/stock/company-retreat.jpg',
  },
  {
    name: 'Quarterly Town Hall',
    date: ('2025-06-01'),
    description:
      'Company-wide meeting to discuss quarterly achievements and future plans.',
    photo: 'https://www.example.com/stock/town-hall.jpg',
  },
  {
    name: 'Product Launch Event',
    date: ('2025-09-21'),
    description:
      'Join us for the unveiling of our latest product and innovations.',
    photo: 'https://www.example.com/stock/product-launch.jpg',
  },
  {
    name: 'Holiday Party',
    date: ('2025-12-18'),
    description:
      'A festive celebration to end the year with good food, music, and awards.',
    photo: 'https://www.example.com/stock/holiday-party.jpg',
  },
  {
    name: 'Sales Kickoff Meeting',
    date: ('2025-01-10'),
    description:
      'A meeting to align our sales strategies and set new targets for the upcoming year.',
    photo: 'https://www.example.com/stock/sales-kickoff.jpg',
  },
  {
    name: 'Team Building Workshop',
    date: ('2025-04-07'),
    description:
      'Interactive sessions designed to foster collaboration and teamwork.',
    photo: 'https://www.example.com/stock/team-building.jpg',
  },
  {
    name: 'Leadership Summit',
    date: ('2025-05-10'),
    description:
      'An exclusive event for senior management to align on leadership initiatives.',
    photo: 'https://www.example.com/stock/leadership-summit.jpg',
  },
  {
    name: 'Innovation Day',
    date: ('2025-08-15'),
    description:
      'A full-day event where employees present new ideas and prototypes.',
    photo: 'https://www.example.com/stock/innovation-day.jpg',
  },
  {
    name: 'Customer Appreciation Event',
    date: ('2025-07-12'),
    description:
      'A day to appreciate and thank our valued customers for their continued support.',
    photo: 'https://www.example.com/stock/customer-appreciation.jpg',
  },
  {
    name: 'Wellness Day',
    date: ('2025-11-09'),
    description:
      'A company-wide initiative focused on physical and mental health.',
    photo: 'https://www.example.com/stock/wellness-day.jpg',
  },
];

// Seed the database
const seedEvents = async () => {
  try {
    if (mongoose.connection.readyState === 0) { //Connect to MongoDB only if not already connected
      await mongoose.connect('mongodb://localhost:27017/orion-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    await Event.deleteMany({});
    await Event.insertMany(eventData);

    console.log('Events seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding events:', error);
    mongoose.connection.close(); // Close the connection
  }
};

seedEvents();

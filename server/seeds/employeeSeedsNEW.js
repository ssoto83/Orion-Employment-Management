[
  {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '555-555-5555',
    email: 'john.doe@example.com',
    ssn: '123-45-6789',
    position: 'Software Engineer',
    pay: 90000,
    startDate: '2022-01-01T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    address: '456 Elm St',
    phoneNumber: '555-555-5556',
    email: 'jane.smith@example.com',
    ssn: '887-65-4321',
    position: 'Product Manager',
    pay: 95000,
    startDate: '2022-06-15T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    address: '789 Maple St',
    phoneNumber: '555-555-5557',
    email: 'emily.johnson@example.com',
    ssn: '523-45-6780',
    position: 'UX Designer',
    pay: 85000,
    startDate: '2023-03-01T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Kimiko',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '555-555-5555',
    email: 'kimiko@example.com',
    ssn: '423-45-6789',
    position: 'Software Engineer',
    pay: 90000,
    startDate: '2022-01-01T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Zain',
    lastName: 'Doe',
    address: '456 Pecan St',
    phoneNumber: '555-555-5556',
    email: 'zain@example.com',
    ssn: '987-65-4321',
    position: 'Product Manager',
    pay: 95000,
    startDate: '2022-06-15T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Susana',
    lastName: 'Doe',
    address: '789 Maple St',
    phoneNumber: '555-555-5557',
    email: 'susana@example.com',
    ssn: '223-45-6780',
    position: 'UX Designer',
    pay: 85000,
    startDate: '2023-03-01T00:00:00Z',
    isActive: true,
  },
  {
    firstName: 'Rachel',
    lastName: 'Doe',
    address: '3001 Robinhood St',
    phoneNumber: '555-555-5557',
    email: 'rachel@example.com',
    ssn: '323-45-6780',
    position: 'UX Designer',
    pay: 85000,
    startDate: '2023-03-01T00:00:00Z',
    isActive: true,
  },
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

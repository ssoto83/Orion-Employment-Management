// Added Events and refactored RB 101824

const { AuthenticationError } = require('apollo-server-express');
const { Employee, TimeOffRequest, Event } = require('../models'); // Import the Event model
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    // Return the current logged-in employee's info
    me: async (_, __, context) => {
      if (context.employee) {
        return await Employee.findById(context.employee._id);
      }
      throw new AuthenticationError('Not logged in');
    },

    // Get all employees, optionally filter by name or ID
    employees: async (_, { searchTerm, searchBy }) => {
      let query = {};
      if (searchTerm && searchBy) {
        if (searchBy === 'name') {
          query = {
            $or: [
              { firstName: { $regex: searchTerm, $options: 'i' } },
              { lastName: { $regex: searchTerm, $options: 'i' } },
            ],
          };
        } else if (searchBy === 'id') {
          query = { _id: searchTerm };
        }
      }
      return await Employee.find(query).sort({ lastName: 1, firstName: 1 });
    },

    // Get a single employee by ID
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },

    // Get all time off requests
    timeOffRequests: async () => {
      return await TimeOffRequest.find().populate('employee');
    },

    // Get all events
    events: async () => {
      return await Event.find().sort({ date: 1 });
    },

    // Get a single event by ID
    event: async (_, { id }) => {
      return await Event.findById(id);
    },
  },

  Mutation: {
    // Login mutation for employee authentication
    login: async (_, { email, password }) => {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await employee.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = jwt.sign(
        { _id: employee._id, isAdmin: employee.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
      return { token, employee };
    },

    // Add a new employee
    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      return employee;
    },

    // Update an employee's details
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    // Terminate an employee (only accessible to admin)
    terminateEmployee: async (_, { id, adminPassword }, context) => {
      if (context.employee && context.employee.isAdmin) {
        const isCorrect = adminPassword === process.env.ADMIN_PASSWORD;
        if (isCorrect) {
          await Employee.findByIdAndUpdate(id, { isActive: false });
          return true;
        }
      }
      throw new AuthenticationError('Unauthorized or incorrect password');
    },

    // Create a time off request for an employee
    createTimeOffRequest: async (_, { employeeId, startDate, endDate }) => {
      return await TimeOffRequest.create({
        employee: employeeId,
        startDate,
        endDate,
        status: 'pending',
      });
    },

    // Update the status of a time off request (pending, approved, denied)
    updateTimeOffRequestStatus: async (_, { requestId, status }) => {
      return await TimeOffRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
    },

    // Add a new event
    addEvent: async (_, { input }, context) => {
      if (context.employee && context.employee.isAdmin) {
        const event = await Event.create(input);
        return event;
      }
      throw new AuthenticationError('Unauthorized');
    },

    // Update an existing event
    updateEvent: async (_, { id, input }, context) => {
      if (context.employee && context.employee.isAdmin) {
        const updatedEvent = await Event.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updatedEvent;
      }
      throw new AuthenticationError('Unauthorized');
    },

    // Delete an event
    deleteEvent: async (_, { id }, context) => {
      if (context.employee && context.employee.isAdmin) {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (deletedEvent) {
          return true;
        }
        return false;
      }
      throw new AuthenticationError('Unauthorized');
    },
  },
};

module.exports = resolvers;

// original code replaced with the code above
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// const { AuthenticationError } = require("apollo-server-express");
// const { User, Employee, TimeOffRequest } = require("../models");

// const resolvers = {
//   Query: {
//     me: async (_, __, context) => {
//       if (context.user) {
//         return await User.findById(context.user._id);
//       }
//       throw new AuthenticationError("Not logged in");
//     },
//     employees: async (_, { searchTerm, searchBy }) => {
//       let query = {};
//       if (searchTerm && searchBy) {
//         if (searchBy === "name") {
//           query = {
//             $or: [
//               { firstName: { $regex: searchTerm, $options: "i" } },
//               { lastName: { $regex: searchTerm, $options: "i" } },
//             ],
//           };
//         } else if (searchBy === "id") {
//           query = { _id: searchTerm };
//         }
//       }
//       return await Employee.find(query).sort({ lastName: 1, firstName: 1 });
//     },
//     employee: async (_, { id }) => {
//       return await Employee.findById(id);
//     },
//     timeOffRequests: async () => {
//       return await TimeOffRequest.find().populate("employee");
//     },
//   },
//   Mutation: {
//     login: async (_, { email, password }) => {
//       const user = await User.findOne({ email });
//       if (!user) {
//         throw new AuthenticationError("Incorrect credentials");
//       }
//       const correctPw = await user.isCorrectPassword(password);
//       if (!correctPw) {
//         throw new AuthenticationError("Incorrect credentials");
//       }
//       const token = jwt.sign(
//         { _id: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "2h" }
//       );
//       return { token, user };
//     },
//     addEmployee: async (_, args) => {
//       const employee = await Employee.create(args);
//       // Here you would also create a User account for the employee
//       return employee;
//     },
//     updateEmployee: async (_, { id, ...updates }) => {
//       return await Employee.findByIdAndUpdate(id, updates, { new: true });
//     },
//     terminateEmployee: async (_, { id, adminPassword }, context) => {
//       if (context.user && context.user.role === "admin") {
//         const admin = await User.findById(context.user._id);
//         // const isCorrect = await bcrypt.compare(adminPassword, admin.password);
//         if (isCorrect) {
//           await Employee.findByIdAndUpdate(id, { isActive: false });
//           return true;
//         }
//       }
//       return false;
//     },
//     createTimeOffRequest: async (_, { employeeId, startDate, endDate }) => {
//       return await TimeOffRequest.create({
//         employee: employeeId,
//         startDate,
//         endDate,
//         status: "pending",
//       });
//     },
//     updateTimeOffRequestStatus: async (_, { requestId, status }) => {
//       return await TimeOffRequest.findByIdAndUpdate(
//         requestId,
//         { status },
//         { new: true }
//       );
//     },
//   },
// };

// module.exports = resolvers;

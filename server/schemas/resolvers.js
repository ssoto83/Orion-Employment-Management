// Added Events and refactored RB 101824
const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Employee, TimeOffRequest } = require("../models");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
  Query: {
    // Return the current logged-in employee's info
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw AuthenticationError;
    },

    // Get all employees, optionally filter by name or ID
    employees: async (_, __, context) => {
      if (context.user) {
        return await Employee.find();
      }
      throw AuthenticationError;
    },

    // Get a single employee by ID
    employee: async (_, args, context) => {
      if (context.user) {
        return await Employee.findOne({ user: context.user._id });
      }
      throw AuthenticationError;
    },

    // Get all time off requests
    /* timeOffRequests: async (_, __, context) => {
      if (context.user) {
        return await TimeOffRequest.find();
      }
      throw AuthenticationError;
    }, */
  },

  Mutation: {
    // Login mutation for employee authentication
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },

    // Signup mutation
    signup: async (_, { username, password, email }) => {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        throw AuthenticationError;
      }

      const user = await User.create({
        username,
        password,
        email,
      });

      await Employee.findOneAndUpdate(
        { _id: employee._id },
        { $set: { user: user } },
        { new: true }
      );
      const token = signToken(user);
      return { token, user };
    },

    // Add a new employee
    addEmployee: async (_, { employee }, context) => {
      if (context.user) {
        const newEmployee = await Employee.create(employee);
        return newEmployee;
      }
      throw AuthenticationError;
    },

    // Update an employee's details
    updateEmployee: async (_, args, context) => {
      if (context.user) {
        return await Employee.findByIdAndUpdate(
          { _id: args.empId },
          {
            firstName: args.firstName,
            lastName: args.lastName,
            ssn: args.ssn,
            position: args.position,
            pay: args.pay,
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

    // Terminate an employee (only accessible to admin)
    terminateEmployee: async (_, { userId }, context) => {
      if (context.user /* .isAdmin */) {
        const user = await User.findOneAndDelete({ _id: userId });
        return await Employee.findOneAndDelete(user);
      }
      throw AuthenticationError;
    },

    // Create a time off request for an employee
    createTimeOffRequest: async (_, { empId, startDate, endDate }, context) => {
      if (context.user) {
        /* const request = await TimeOffRequest.create({
          startDate,
          endDate,
        });
         await Employee.findOneAndUpdate(
          { _id: empId },
          { $addToSet: { timeOffRequests: request } },
          { new: true }
        );
        return request; */

        return await Employee.findOneAndUpdate(
          { _id: empId },
          { $addToSet: { timeOffRequests: { startDate, endDate } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

    // Update the status of a time off request (pending, approved, denied)
    updateTimeOffRequestStatus: async (
      _,
      { empId, requestId, status },
      context
    ) => {
      if (context.user /* .isAdmin */) {
        /* return await TimeOffRequest.findByIdAndUpdate(
          requestId,
          { status },
          { new: true }
        ); */
        const employee = await Employee.findOne({ _id: empId });
        employee.timeOffRequests.id(requestId).status = status;
        employee.markModified("timeOffRequests");
        employee.save();
        return employee;
      }
      throw AuthenticationError;
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

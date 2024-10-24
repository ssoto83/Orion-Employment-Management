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
    login: async (_, { username, password }) => {
      try {
        // Find the user by username
        const user = await User.findOne({ username }).select(
          "username email password isAdmin"
        );

        console.log("User found:", user ? "Yes" : "No");

        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Check password
        const correctPw = await user.isCorrectPassword(password);

        console.log("Password correct:", correctPw ? "Yes" : "No");

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        // Generate token
        const token = signToken(user);

        console.log(
          "Login successful. User is admin:",
          user.isAdmin ? "Yes" : "No"
        );

        // Return token and user info
        return {
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        };
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
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

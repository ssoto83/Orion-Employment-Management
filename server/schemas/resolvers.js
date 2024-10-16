const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { User, Employee, TimeOffRequest } = require("../models");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError("Not logged in");
    },
    employees: async (_, { searchTerm, searchBy }) => {
      let query = {};
      if (searchTerm && searchBy) {
        if (searchBy === "name") {
          query = {
            $or: [
              { firstName: { $regex: searchTerm, $options: "i" } },
              { lastName: { $regex: searchTerm, $options: "i" } },
            ],
          };
        } else if (searchBy === "id") {
          query = { _id: searchTerm };
        }
      }
      return await Employee.find(query).sort({ lastName: 1, firstName: 1 });
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
    timeOffRequests: async () => {
      return await TimeOffRequest.find().populate("employee");
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      return { token, user };
    },
    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      // Here you would also create a User account for the employee
      return employee;
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    terminateEmployee: async (_, { id, adminPassword }, context) => {
      if (context.user && context.user.role === "admin") {
        const admin = await User.findById(context.user._id);
        const isCorrect = await bcrypt.compare(adminPassword, admin.password);
        if (isCorrect) {
          await Employee.findByIdAndUpdate(id, { isActive: false });
          return true;
        }
      }
      return false;
    },
    createTimeOffRequest: async (_, { employeeId, startDate, endDate }) => {
      return await TimeOffRequest.create({
        employee: employeeId,
        startDate,
        endDate,
        status: "pending",
      });
    },
    updateTimeOffRequestStatus: async (_, { requestId, status }) => {
      return await TimeOffRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

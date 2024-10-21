// Import the gql tagged template function.  Added by RB on 101824
const { gql } = require('apollo-server-express');

const typeDefs = `

  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    address: String!
    phoneNumber: String!
    email: String!
    ssn: String!
    position: String!
    pay: Float!
    startDate: Date!
    isActive: Boolean!
  }

   input EmployeeInfo {
     firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
      email: String!
      ssn: String!
      position: String!
      pay: Float!
      startDate: Date!
  }

    type TimeOffRequest {
    _id: ID!
    employee: Employee!
    startDate: Date!
    endDate: Date!
    status: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    employees: [Employee]
    employee(userId: ID!): Employee
    timeOffRequests: [TimeOffRequest]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(email: String!, username: String!, password: String!): Auth
    addEmployee(employee: EmployeeInfo!): Employee
    updateEmployee(
      empId: ID!
      firstName: String
      lastName: String
      ssn: String
      position: String
      pay: Float
    ): Employee
    terminateEmployee(userId: ID!): Employee
    createTimeOffRequest(
      empId: ID!
      startDate: Date!
      endDate: Date!
    ): TimeOffRequest
    updateTimeOffRequestStatus(requestId: ID!, status: String!): TimeOffRequest
  }
`;

module.exports = typeDefs;

// Import the gql tagged template function.  Added by RB on 101824
/* const { gql } = require('apollo-server-express'); */

const typeDefs = `

  scalar Date

  type User {
    _id: ID!
    username: String!
    isAdmin: Boolean!
    email: String!
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
    user:User
    timeOffRequests:[TimeOffRequest]
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
    employee: Employee
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
      address:String
      phoneNumber:String 
    ): Employee
    terminateEmployee(empId: ID!): Employee
    createTimeOffRequest(
      empId: ID!
      startDate: Date!
      endDate: Date!
    ): Employee
    updateTimeOffRequestStatus(empId:ID!,requestId: ID!, status: String!): Employee
  }
`;

module.exports = typeDefs;

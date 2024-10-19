// Import the gql tagged template function.  Added by RB on 101824
const { gql } = require('apollo-server-express');

const typeDefs = `
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
    startDate: String!
    isActive: Boolean!
  }


  type Event {
    id: ID!
    name: String!
    date: String!
    description: String!
    photo: String!
  }

  input EventInput {
    name: String!
    date: String!
    description: String!
    photo: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    addEvent(input: EventInput!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    deleteEvent(id: ID!): Boolean
  
    }

    type TimeOffRequest {
    _id: ID!
    employee: Employee!
    startDate: String!
    endDate: String!
    status: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    employees(searchTerm: String, searchBy: String): [Employee]
    employee(id: ID!): Employee
    timeOffRequests: [TimeOffRequest]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addEmployee(
      firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
      email: String!
      ssn: String!
      position: String!
      pay: Float!
      startDate: String!
    ): Employee
    updateEmployee(
      id: ID!
      firstName: String
      lastName: String
      ssn: String
      position: String
      pay: Float
    ): Employee
    terminateEmployee(id: ID!, adminPassword: String!): Boolean
    createTimeOffRequest(
      employeeId: ID!
      startDate: String!
      endDate: String!
    ): TimeOffRequest
    updateTimeOffRequestStatus(requestId: ID!, status: String!): TimeOffRequest
  }
`;

module.exports = typeDefs;

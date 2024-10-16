
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

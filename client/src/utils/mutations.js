import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation AddUser(
  $username: String!
  $email: String!
  $password: String!
) {
  addUser(
    username: $username
    email: $email
    password: $password
  ) {
    token
    user {
      id
      username
      email
    }
  }
})`;

// Add a new employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($employee: EmployeeInfo!) {
    addEmployee(employee: $employee) {
      _id
      address
      email
      firstName
      isActive
      lastName
      pay
      phoneNumber
      position
      ssn
      startDate
    }
  }
`;
// Update employee details
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $empId: ID!
    $firstName: String
    $lastName: String
    $ssn: String
    $position: String
    $pay: Float
  ) {
    updateEmployee(
      empId: $empId
      firstName: $firstName
      lastName: $lastName
      ssn: $ssn
      position: $position
      pay: $pay
    ) {
      id
      firstName
      lastName
      ssn
      position
      pay
    }
  }
`;

// Login user
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Define the SIGNUP mutation
export const SIGNUP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

//Create TimeOffRequest
export const CREATE_TIMEOFFREQUEST = gql`
  mutation CreateTimeOffRequest(
    $empId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    createTimeOffRequest(
      empId: $empId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      startDate
      endDate
      status
    }
  }
`;
export const UPDATE_TIMEOFFREQUEST_STATUS = gql`
  mutation UpdateTimeOffRequestStatus($requestId: ID!, $status: String!) {
    updateTimeOffRequestStatus(requestId: $requestId, status: $status) {
      id
      status
    }
  }
`;

import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      _id
      firstName
      lastName
      email
      position
      pay
      startDate
      isActive
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeUpdateInput!) {
    updateEmployee(id: $id, input: $input) {
      _id
      firstName
      lastName
      email
      position
      pay
      startDate
      isActive
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      _id
    }
  }
`;

// Login user
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

// Define the SIGNUP mutation HELP
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
      _id
      firstName
      lastName
      timeOffRequests {
        _id
        startDate
        endDate
        status
      }
    }
  }
`;
export const UPDATE_TIMEOFFREQUEST_STATUS = gql`
  mutation UpdateTimeOffRequestStatus(
    $empId: ID!
    $requestId: ID!
    $status: String!
  ) {
    updateTimeOffRequestStatus(
      empId: $empId
      requestId: $requestId
      status: $status
    ) {
      _id
      firstName
      lastName
      timeOffRequests {
        _id
        startDate
        endDate
        status
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation addEmployee($employee: EmployeeInput!) {
    addEmployee(employee: $employee) {
      _id
      firstName
      lastName
      email
      ssn
      address
      position
      pay
      startDate
      isActive
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
 mutation UpdateEmployee($empId: ID!, $firstName: String, $lastName: String, $ssn: String, $position: String, $pay: Float, $phoneNumber: String, $address: String) {
  updateEmployee(empId: $empId, firstName: $firstName, lastName: $lastName, ssn: $ssn, position: $position, pay: $pay,  phoneNumber: $phoneNumber, address: $address) {
    _id
    firstName
    lastName
    address
    phoneNumber
    email
    ssn
    position
    pay
    startDate
    isActive
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation terminateEmployee($userId: ID!) {
    terminateEmployee(userId: $userId) {
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
        _id
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

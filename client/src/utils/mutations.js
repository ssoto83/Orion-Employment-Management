import { gql } from '@apollo/client';

// Add a new user (for signup)
export const ADD_USER = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input) {
      id
      firstName
      lastName
      email
      token
    }
  }
`;

// Add a new employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      id
      firstName
      lastName
      email
      position
      startDate
    }
  }
`;

// Update employee details
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      position
      startDate
    }
  }
`;

// Add a new event
export const ADD_EVENT = gql`
  mutation AddEvent($input: AddEventInput!) {
    addEvent(input: $input) {
      id
      name
      date
      photo
    }
  }
`;

// Login user
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      username
      email
      token
    }
  }
`;

export const CREATE_TIMEOFFREQUEST = gql`
  mutation createTimeOffRequest($input: TimeOffRequestInput!) {
    createTimeOffRequest(input: $input) {
      id
    }
  }
`;
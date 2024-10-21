import { gql } from '@apollo/client';

// Get all employees
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      email
      position
    }
  }
`;

// Get a specific employee by ID
export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      position
      startDate
    }
  }
`;


export const GET_ME = gql`
  query getMe {
    me {
      id
      username
      email
      
    }
  }
`;

export const GET_ALLREQUESTS = gql`
  query GetAllRequests {
    timeOffRequests {
      id
      startDate
      endDate
      employee {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USERREQUESTS = gql`
  query GetUserRequests($employeeId: ID!) {
    userRequests(employeeId: $employeeId) {
      id
      startDate
      endDate
      status
    }
  }
`;

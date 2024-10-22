import { gql } from "@apollo/client";

// Get all employees
export const GET_EMPLOYEES = gql`
  query Employees {
    employees {
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

// Get a specific employee by ID
export const GET_EMPLOYEE_BY_ID = gql`
  query Employee($userId: ID!) {
    employee(userId: $userId) {
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
  query TimeOffRequests {
    timeOffRequests {
      id
      startDate
      endDate
      status
      employee {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USERREQUESTS = gql`
  query UserTimeOffRequests($empId: ID!) {
    userTimeOffRequests(empId: $empId) {
      id
      startDate
      endDate
      status
    }
  }
`;

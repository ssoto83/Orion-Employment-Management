import { gql } from "@apollo/client";

// Get all employees
export const GET_EMPLOYEES = gql`
  query Employees {
    employees {
      _id
      firstName
      lastName
      email
      position
      pay
      startDate
      isActive
      address
      phoneNumber
      ssn
      user {
        _id
      }
      timeOffRequests {
        _id
        startDate
        endDate
        status
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
      address
      phoneNumber
      email
      ssn
      position
      pay
      startDate
      isActive
      timeOffRequests {
        _id
        startDate
        endDate
        status
      }
    }
  }
`;

// Get a specific employee by ID
export const GET_EMPLOYEE_BY_ID = gql`
  query Employee {
    employee {
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
      timeOffRequests {
        _id
        startDate
        endDate
        status
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      isAdmin
      email
    }
  }
`;

export const GET_ALLREQUESTS = gql`
  query AllTimeOffRequests {
    employees {
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

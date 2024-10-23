import { gql } from '@apollo/client';

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

//use get employee
/* export const GET_USERREQUESTS = gql`
  query GetUserRequests($employeeId: ID!) {
    userRequests(employeeId: $employeeId) {
      id
      startDate
      endDate
      status
    }
  }
`;
 */
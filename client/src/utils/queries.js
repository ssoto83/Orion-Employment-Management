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

// // Get all events
// export const GET_EVENTS = gql`
//   query GetEvents {
//     events {
//       id
//       name
//       date
//       photo
//     }
//   }
// `;

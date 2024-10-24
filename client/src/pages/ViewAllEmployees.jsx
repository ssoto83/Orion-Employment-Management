import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid Date';
  }
};

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'position', headerName: 'Position', width: 150 },
  { field: 'pay', headerName: 'Pay', width: 100 },
  { 
    field: 'startDate', 
    headerName: 'Start Date', 
    width: 150, 
    valueGetter: (params) => {
      if (params.row && params.row.startDate) {
        return formatDate(params.row.startDate);
      }
      return 'N/A';
    }
  },
];

const ViewAllEmployees = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Log the data to console for debugging
  console.log('Employees data:', data);

  // Check if data and employees exist
  if (!data || !data.employees) {
    console.error('No employees data available');
    return <div>No employee data available</div>;
  }

  // Ensure each employee has an _id
  const employeesWithIds = data.employees.map((employee, index) => ({
    ...employee,
    _id: employee._id || `temp-id-${index}`
  }));

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={employeesWithIds}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default ViewAllEmployees;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'; // Import Box component


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
  { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 250, editable: true },
  { field: 'position', headerName: 'Position', width: 150, editable: true },
  { field: 'pay', headerName: 'Pay', width: 100, editable: true, type: 'number' },
  // {
  //   field: 'startDate',
  //   headerName: 'Start Date',
  //   width: 150,
  //   valueGetter: (params) => formatDate(params.row.startDate),
  //   editable: true,
  //   type: 'date',
  // },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 100,
    type: 'boolean',
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleEditEmployee(params.row)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteEmployee(params.row._id)}
          style={{ marginLeft: '8px' }}
        >
          Delete
        </Button>
      </>
    ),
  },
];

const ViewAllEmployees = () => {
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const handleAddEmployee = () => {
    setAddEmployeeOpen(true);
    // Open a modal or form to add a new employee
  };

  const handleEditEmployee = (employee) => {
    setEditEmployeeData(employee);
    setEditEmployeeOpen(true);
    // Open a modal or form to edit the employee
  };

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee({ variables: { id: employeeId } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ height: 600, width: '80%' }}>
        <DataGrid
          rows={data.employees}
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
          components={{
            Toolbar: GridToolbar,
          }}
          onCellEditCommit={(params) => {
            updateEmployee({
              variables: {
                id: params.id,
                input: { [params.field]: params.value },
              },
            });
          }}
        />
      </Paper>
    </Box>
  );
};

export default ViewAllEmployees;
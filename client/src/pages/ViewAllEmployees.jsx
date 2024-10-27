import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewAllEmployees = () => {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleEditEmployee = (employeeId) => {
    const employee = data.employees.find(emp => emp._id === employeeId);
    setEditingEmployee(employee);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEdit = async () => {
    try {
      console.log('Saving employee:', editingEmployee); // Debug log
      const result = await updateEmployee({
        variables: {
          empId: editingEmployee._id,  // Changed from userId to empId
          firstName: editingEmployee.firstName,
          lastName: editingEmployee.lastName,
          email: editingEmployee.email,
          position: editingEmployee.position,
          pay: parseFloat(editingEmployee.pay),
          isActive: editingEmployee.isActive
        }
      });
      console.log('Update result:', result); // Debug log
      handleCloseEditDialog();
      refetch();
    } catch (error) {
      console.error('Error updating employee:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee({ variables: { userId: employeeId } });
        refetch();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {name: "_id", label: "User ID" },
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "position", label: "Position" },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) => new Date(value).toLocaleDateString(),
      }
    },
    {
      name: "pay",
      label: "Pay",
      options: {
        customBodyRender: (value) => `$${value.toFixed(2)}`,
      }
    },
    {
      name: "isActive",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip 
            label={value ? "Active" : "Inactive"} 
            color={value ? "success" : "error"}
          />
        ),
      }
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const employeeId = data.employees[tableMeta.rowIndex]._id;
          return (
            <>
              <IconButton color="primary" onClick={() => handleEditEmployee(employeeId)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteEmployee(employeeId)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        }
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    selectableRows: 'none',
    print: false,
    download: false,
  };

  const theme = createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            padding: '16px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={"All Employees"}
        data={data.employees}
        columns={columns}
        options={options}
      />
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {editingEmployee && (
            <>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                value={editingEmployee.firstName}
                onChange={(e) => setEditingEmployee({...editingEmployee, firstName: e.target.value})}
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                value={editingEmployee.lastName}
                onChange={(e) => setEditingEmployee({...editingEmployee, lastName: e.target.value})}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={editingEmployee.email}
                onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
              />
              <TextField
                margin="dense"
                label="Position"
                fullWidth
                value={editingEmployee.position}
                onChange={(e) => setEditingEmployee({...editingEmployee, position: e.target.value})}
              />
              <TextField
                margin="dense"
                label="Pay"
                fullWidth
                type="number"
                value={editingEmployee.pay}
                onChange={(e) => setEditingEmployee({...editingEmployee, pay: e.target.value})}
              />
              <TextField
                margin="dense"
                label="Status"
                fullWidth
                select
                value={editingEmployee.isActive}
                onChange={(e) => setEditingEmployee({...editingEmployee, isActive: e.target.value === 'true'})}
                SelectProps={{
                  native: true,
                }}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ViewAllEmployees;

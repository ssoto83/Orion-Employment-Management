// ViewAllEmployees.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import CustomTable from '../components/TableData';

const ViewAllEmployees = () => {
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    pay: '',
    phoneNumber: '',
    address: '',
    ssn: '',
    startDate: new Date().toISOString().split('T')[0],
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Employee added successfully!', severity: 'success' });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Employee updated successfully!', severity: 'success' });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Employee deleted successfully!', severity: 'success' });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  const handleEditEmployee = (employee) => {
    setEditEmployeeData({
      ...employee,
      startDate: new Date(employee.startDate).toISOString().split('T')[0]
    });
    setEditEmployeeOpen(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee({ variables: { empId: employeeId } });
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleSaveEmployee = async () => {
    try {
      await updateEmployee({
        variables: {
          empId: editEmployeeData._id,
          firstName: editEmployeeData.firstName,
          lastName: editEmployeeData.lastName,
          email: editEmployeeData.email,
          position: editEmployeeData.position,
          pay: parseFloat(editEmployeeData.pay),
          startDate: editEmployeeData.startDate,
          address: editEmployeeData.address,
        },
      });
      setEditEmployeeOpen(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee({
        variables: {
          employee: newEmployeeData,
        },
      });
      setAddEmployeeOpen(false);
      setNewEmployeeData({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        pay: '',
        phoneNumber: '',
        address: '',
        ssn: '',
        startDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const columns = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "position", label: "Position" },
    { 
      name: "startDate", 
      label: "Start Date", 
      options: { customBodyRender: (value) => new Date(value).toLocaleDateString() }
    },
    { name: "pay", label: "Pay" },
    { name: "phoneNumber", label: "Phone Number" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (_, tableMeta) => {
          const employee = data.employees[tableMeta.rowIndex];
          return (
            <Box display="flex" gap={1}>
              <IconButton color="primary" onClick={() => handleEditEmployee(employee)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteEmployee(employee._id)} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const flattenedData = data?.employees?.map(employee => ({
    ...employee,
    startDate: employee.startDate.split("T")[0]  // Formatting date for display
  })) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Box>
          <Typography variant="h2" mb="5px">Employees</Typography>
          <Typography variant="h5">Managing the Employee List</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAddEmployeeOpen(true)}
        >
          Add New Employee
        </Button>
      </Box>

      <CustomTable
        title="Employee List"
        data={flattenedData}
        columns={columns}
      />

      {/* Add Employee Dialog */}
      <Dialog open={addEmployeeOpen} onClose={() => setAddEmployeeOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            value={newEmployeeData.firstName}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, firstName: e.target.value })}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Last Name"
            value={newEmployeeData.lastName}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, lastName: e.target.value })}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            value={newEmployeeData.email}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, email: e.target.value })}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Position"
            value={newEmployeeData.position}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, position: e.target.value })}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Pay"
            type="number"
            value={newEmployeeData.pay}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, pay: parseFloat(e.target.value) })}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Phone Number"
            value={newEmployeeData.phoneNumber}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, phoneNumber: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            value={newEmployeeData.address}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, address: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="SSN"
            value={newEmployeeData.ssn}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, ssn: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            value={newEmployeeData.startDate}
            onChange={(e) => setNewEmployeeData({ ...newEmployeeData, startDate: e.target.value })}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEmployeeOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary" variant="contained">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={editEmployeeOpen} onClose={() => setEditEmployeeOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            value={editEmployeeData?.firstName || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, firstName: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            value={editEmployeeData?.lastName || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, lastName: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            value={editEmployeeData?.email || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, email: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Position"
            value={editEmployeeData?.position || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, position: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Pay"
            type="number"
            value={editEmployeeData?.pay || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, pay: parseFloat(e.target.value) })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            value={editEmployeeData?.startDate || ''}
            onChange={(e) => setEditEmployeeData({ ...editEmployeeData, startDate: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditEmployeeOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEmployee} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewAllEmployees;

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';
import EmployeeHeader from '../components/employees/EmployeeHeader';
import EmployeeList from '../components/employees/EmployeesList';
import AddEmployeeDialog from '../components/employees/dialogs/AddEmployeeDialog';
import EditEmployeeDialog from '../components/employees/dialogs/EditEmployeeDialog';
import Notification from '../components/common/Notifications';

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
    startDate: new Date().toISOString().split('T')[0],
    isActive: true,
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ 
        open: true, 
        message: 'Employee added successfully!', 
        severity: 'success' 
      });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ 
        open: true, 
        message: `Error: ${error.message}`, 
        severity: 'error' 
      });
    }
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ 
        open: true, 
        message: 'Employee updated successfully!', 
        severity: 'success' 
      });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ 
        open: true, 
        message: `Error: ${error.message}`, 
        severity: 'error' 
      });
    }
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      setSnackbar({ 
        open: true, 
        message: 'Employee deleted successfully!', 
        severity: 'success' 
      });
      refetch();
    },
    onError: (error) => {
      setSnackbar({ 
        open: true, 
        message: `Error: ${error.message}`, 
        severity: 'error' 
      });
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box m="20px">
      <EmployeeHeader onAddClick={() => setAddEmployeeOpen(true)} />
      
      <EmployeeList
        data={data.employees}
        onEdit={(employee) => {
          setEditEmployeeData({
            ...employee,
            startDate: new Date(employee.startDate).toISOString().split('T')[0]
          });
          setEditEmployeeOpen(true);
        }}
        onDelete={(employeeId) => {
          if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee({ variables: { userId: employeeId } });
          }
        }}
      />

      <AddEmployeeDialog
        open={addEmployeeOpen}
        onClose={() => setAddEmployeeOpen(false)}
        initialData={newEmployeeData}
        onSubmit={async () => {
          try {
            await addEmployee({
              variables: {
                employee: newEmployeeData,
              }
            });
            setAddEmployeeOpen(false);
            setNewEmployeeData({
              firstName: '',
              lastName: '',
              email: '',
              position: '',
              pay: '',
              startDate: new Date().toISOString().split('T')[0],
            });
          } catch (error) {
            console.error('Error adding employee:', error);
          }
        }}
      />

      <EditEmployeeDialog
        open={editEmployeeOpen}
        onClose={() => setEditEmployeeOpen(false)}
        employeeData={editEmployeeData}
        onSubmit={async () => {
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
                isActive: editEmployeeData.isActive,
                address: editEmployeeData.address,
              },
            });
            setEditEmployeeOpen(false);
          } catch (error) {
            console.error('Error updating employee:', error);
          }
        }}
      />

      <Notification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default ViewAllEmployees;
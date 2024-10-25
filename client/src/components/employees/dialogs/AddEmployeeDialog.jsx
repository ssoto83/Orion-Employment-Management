import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EmployeeForm from './EmployeeForm';

const AddEmployeeDialog = ({ open, onClose, onSubmit, initialData }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Add New Employee</DialogTitle>
    <DialogContent>
      <EmployeeForm 
        initialData={initialData}
        onSubmit={onSubmit}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Cancel</Button>
      <Button onClick={onSubmit} color="primary" variant="contained">
        Add Employee
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddEmployeeDialog;
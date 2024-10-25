import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EmployeeForm from './EmployeeForm';

const EditEmployeeDialog = ({ open, onClose, onSubmit, employeeData }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Edit Employee</DialogTitle>
    <DialogContent>
      <EmployeeForm 
        initialData={employeeData}
        onSubmit={onSubmit}
        isEdit
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Cancel</Button>
      <Button onClick={onSubmit} color="primary" variant="contained">
        Save Changes
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditEmployeeDialog;
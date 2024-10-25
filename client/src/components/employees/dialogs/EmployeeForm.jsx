import React from 'react';
import { TextField } from '@mui/material';

const EmployeeForm = ({ initialData, onChange }) => (
  <>
    <TextField
      margin="dense"
      label="First Name"
      value={initialData?.firstName || ''}
      onChange={(e) => onChange({ ...initialData, firstName: e.target.value })}
      fullWidth
      required
    />
    <TextField
      margin="dense"
      label="Last Name"
      value={initialData?.lastName || ''}
      onChange={(e) => onChange({ ...initialData, lastName: e.target.value })}
      fullWidth
      required
    />
    <TextField
      margin="dense"
      label="Email"
      type="email"
      value={initialData?.email || ''}
      onChange={(e) => onChange({ ...initialData, email: e.target.value })}
      fullWidth
      required
    />
    <TextField
      margin="dense"
      label="Position"
      value={initialData?.position || ''}
      onChange={(e) => onChange({ ...initialData, position: e.target.value })}
      fullWidth
      required
    />
    <TextField
      margin="dense"
      label="Pay"
      type="number"
      value={initialData?.pay || ''}
      onChange={(e) => onChange({ ...initialData, pay: parseFloat(e.target.value) })}
      fullWidth
      required
    />
    <TextField
      margin="dense"
      label="Start Date"
      type="date"
      value={initialData?.startDate || ''}
      onChange={(e) => onChange({ ...initialData, startDate: e.target.value })}
      fullWidth
      required
      InputLabelProps={{ shrink: true }}
    />
  </>
);

export default EmployeeForm;
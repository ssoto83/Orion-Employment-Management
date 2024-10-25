import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EmployeeHeader = ({ onAddClick }) => (
<Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
    <Box>
        <Typography variant="h2" mb="5px">Employees</Typography>
        <Typography variant="h5">Managing the Employee List</Typography>
    </Box>
    <Button
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    onClick={onAddClick}
    >
        Add New Employee
        </Button>
        </Box>
);

export default EmployeeHeader;
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEmployeeColumns } from './hooks/useEmployeeColumns';

const EmployeeList = ({ data, onEdit, onDelete }) => {
    const columns = useEmployeeColumns({ onEdit, onDelete });
    return (
    <Box
    height="75vh"
    sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#1976d2",
        color: "white",
        borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: "#f5f5f5" },
        "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: "#f5f5f5",
        },
        "& .MuiDataGrid-row": {
        "&:nth-of-type(odd)": { backgroundColor: "white" },
        "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: "#1976d2" },
    }}
    >
    <DataGrid
        rows={data}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
    />
    </Box>
);
};

export default EmployeeList;

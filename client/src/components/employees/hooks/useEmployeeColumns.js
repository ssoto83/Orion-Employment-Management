import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const useEmployeeColumns = ({ onEdit, onDelete }) => [
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "ssn", headerName: "SSN", flex: 1 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  { field: "address", headerName: "Address", flex: 1 },
  { field: "position", headerName: "Position", flex: 1 },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    valueFormatter: (params) => new Date(params).toLocaleDateString(),
  },
  { field: "pay", headerName: "Pay", flex: 1 },
  {
    field: "isActive",
    headerName: "Status",
    flex: 0.5,
    renderCell: ({ row: { isActive } }) => (
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={isActive ? "#4caf50" : "#f44336"}
        borderRadius="4px"
      >
        <Typography color="white" sx={{ ml: "5px" }}>
          {isActive ? "Active" : "Inactive"}
        </Typography>
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton
          color="primary"
          onClick={() => onEdit(params.row)}
          size="small"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onDelete(params.row._id)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];

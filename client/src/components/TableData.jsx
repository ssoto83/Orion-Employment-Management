// CustomTable.js
import React from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CustomTable = ({ data, columns, title }) => {
  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
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
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default CustomTable;

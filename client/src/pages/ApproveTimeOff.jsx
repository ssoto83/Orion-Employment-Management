import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALLREQUESTS } from '../graphql/queries';
import { UPDATE_TIMEOFFREQUEST_STATUS } from '../graphql/mutations';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Chip } from '@mui/material';

const ApproveTimeOff = () => {
  const { loading, error, data } = useQuery(GET_ALLREQUESTS);

  const [updateStatus] = useMutation(UPDATE_TIMEOFFREQUEST_STATUS, {
    refetchQueries: [{ query: GET_ALLREQUESTS }],
  });
  const handleStatusUpdate = async (empId, requestId, newStatus) => {
    try {
      console.log('Updating request:', { empId, requestId, newStatus });
      const result = await updateStatus({
        variables: { empId, requestId, status: newStatus },
      });
      console.log('Update result:', result);
    } catch (error) {
      console.error('Error updating status:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (error.networkError) {
        console.error('[Network error]:', error.networkError);
      }
      // Display error to user
      alert(`Failed to update status: ${error.message}`);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const flattenedData = data.employees.flatMap(employee =>
    employee.timeOffRequests.map(request => ({
      ...request,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      empId: employee._id, // Add this line to include the employee ID
    }))
  );

  const columns = [
    {
      name: "employeeName",
      label: "Employee Name",
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) => new Date(value).toLocaleDateString(),
      }
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        customBodyRender: (value) => new Date(value).toLocaleDateString(),
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip 
            label={value.charAt(0).toUpperCase() + value.slice(1)} 
            color={value.toLowerCase() === 'pending' ? 'warning' : value.toLowerCase() === 'approved' ? 'success' : 'error'}
          />
        ),
      }
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const request = flattenedData[tableMeta.rowIndex];
          return request.status.toLowerCase() === 'pending' ? (
            <>
              <Button 
                variant="contained" 
                color="success" 
                onClick={() => handleStatusUpdate(request.empId, request._id, 'Approved')}
                style={{ marginRight: '8px' }}
              >
                Approve
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleStatusUpdate(request.empId, request._id, 'Denied')}
              >
                Deny
              </Button>
            </>
          ) : null;
        }
      }
    },
  ];

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

  console.log('Flattened Data:', flattenedData);

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={"Employee Time Off Requests"}
        data={flattenedData}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default ApproveTimeOff;

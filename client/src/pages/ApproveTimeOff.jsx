// ApproveTimeOff.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALLREQUESTS } from '../graphql/queries';
import { UPDATE_TIMEOFFREQUEST_STATUS } from '../graphql/mutations';
import { Button, Chip } from '@mui/material';
import TableDesign from '../components/TableData';

const ApproveTimeOff = () => {
  const { loading, error, data } = useQuery(GET_ALLREQUESTS);

  const [updateStatus] = useMutation(UPDATE_TIMEOFFREQUEST_STATUS, {
    refetchQueries: [{ query: GET_ALLREQUESTS }],
  });

  const handleStatusUpdate = async (empId, requestId, newStatus) => {
    try {
      await updateStatus({
        variables: { empId, requestId, status: newStatus },
      });
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => console.error(message));
      }
      if (error.networkError) {
        console.error('[Network error]:', error.networkError);
      }
      alert(`Failed to update status: ${error.message}`);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const flattenedData = data.employees.flatMap(employee =>
    employee.timeOffRequests.map(request => ({
      ...request,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      empId: employee._id,
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
                onClick={() => handleStatusUpdate(request.empId, request._id, 'approved')}
                style={{ marginRight: '8px' }}
              >
                Approve
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleStatusUpdate(request.empId, request._id, 'denied')}
              >
                Deny
              </Button>
            </>
          ) : null;
        }
      }
    },
  ];

  return (
    <TableDesign 
      title="Employee Time Off Requests"
      data={flattenedData}
      columns={columns}
    />
  );
};

export default ApproveTimeOff;

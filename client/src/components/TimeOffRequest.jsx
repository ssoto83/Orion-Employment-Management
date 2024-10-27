import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TIMEOFFREQUEST } from "../graphql/mutations";
import { GET_EMPLOYEE_BY_ID } from "../graphql/queries";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import { useState,useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const TimeOffRequest = () => {
  
  const columns = [
    
/*     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 }, */
    {
      id: 'startDate',
      label: 'Start Date',
      minWidth: 170,
      align: 'right',
      format: (value) => dayjs(value).utc().format('MM-DD-YYYY'),
    },
    {
      id: 'endDate',
      label: 'End Date',
      minWidth: 170,
      align: 'right',
      format: (value) => dayjs(value).utc().format('MM-DD-YYYY'),
    },
  { id: 'status', label: 'Status', minWidth: 170 },
  ];
  
  /* function createData(
    name,
    code,
    population,
    size,
  ){
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
   
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };*/


  /* const {data} = useQuery(GET_ME) */
  const { data } = useQuery(GET_EMPLOYEE_BY_ID);
  const [request] = useMutation(CREATE_TIMEOFFREQUEST);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const employee = data?.employee || {};
  console.log(employee);
  /* console.log(employee.timeOffRequests) */
  employee.timeOffRequests?.forEach((request) => {
    console.log(dayjs(request.endDate).format('MM-DD-YYYY'));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*  console.log(employee)
        console.log(employee?._id) */

    try {
      await request({
        variables: { startDate, endDate, empId: employee._id },
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    /* console.log(e) */
    setStartDate(dayjs(dayjs(e.$d)));
    setOpen(true);
  };

  return (
    <>
      {/* <form id="date" onSubmit={handleSubmit}>
            <input type="date" name="startdate" id="startdate" />
            <input type="date" name="enddate" id="enddate" />
            <button type="submit" id='submit-request'>Submit Request</button>
        </form> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid size={4}>
            {/* <table>
              <tbody>
                {employee.timeOffRequests?.map((request) => {
                  return (
                    <tr key={request._id}>
                      <td>
                        {dayjs(request.startDate).utc().format('MM-DD-YYYY')}
                      </td>
                      -<td>{dayjs(request.endDate).utc().format('MM-DD-YYYY')}</td>
                      <td>{request.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.timeOffRequests?.map((request) => {
                return (
                  <TableRow hover /* role="checkbox" tabIndex={-1} */ key={request._id}>
                    {columns.map((column) => {
                      const value = request[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'object'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

          </Grid>
          <Grid size={8}>
            <DateCalendar
              className="calendar"
              renderLoading={() => <DayCalendarSkeleton />}
              defaultValue={() => dayjs()}
              views={['day']}
              onChange={handleOnChange}
             /*  minDate={dayjs().add(1,'month')}
              maxDate={dayjs().add(1,'year')} */
            />
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Schedule Time Off</DialogTitle>
          <DialogContent>
            <DateField
              label="Start Date"
              defaultValue={startDate}
              onBlur={(e) =>
                setStartDate(dayjs(e.target.value).format("YYYY-MM-DD"))
              }
              format="MM-DD-YYYY"
            />
            <DateField
              label="End Date"
              defaultValue={endDate}
              onBlur={(e) =>
                setEndDate(dayjs(e.target.value).format("YYYY-MM-DD"))
              }
              format="MM-DD-YYYY"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};

export default TimeOffRequest;

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TIMEOFFREQUEST } from "../graphql/mutations";
import { GET_EMPLOYEE_BY_ID } from "../graphql/queries";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TimeOffRequest = () => {
  const { data } = useQuery(GET_EMPLOYEE_BY_ID);
  const [request] = useMutation(CREATE_TIMEOFFREQUEST);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const employee = data?.employee || {};

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    try {
      await request({
        variables: { 
          startDate: selectedDate.format('YYYY-MM-DD'), 
          endDate: selectedDate.format('YYYY-MM-DD'), 
          empId: employee._id 
        },
      });
      setOpen(false);
      setSelectedDate(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                {/* ... Your existing table code ... */}
                <TableBody>
                  {employee.timeOffRequests?.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>{dayjs(request.startDate).format('MMMM D, YYYY')}</TableCell>
                      <TableCell>{dayjs(request.endDate).format('MMMM D, YYYY')}</TableCell>
                      <TableCell>{request.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DateCalendar
            className="calendar"
            renderLoading={() => <DayCalendarSkeleton />}
            value={selectedDate}
            onChange={handleDateSelect}
            minDate={dayjs().add(1, 'day')}
            maxDate={dayjs().add(1, 'year')}
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
        <DialogTitle>Confirm Time Off Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to request time off for {selectedDate?.format('MMMM D, YYYY')}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default TimeOffRequest;
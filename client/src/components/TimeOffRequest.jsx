import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TIMEOFFREQUEST } from "../graphql/mutations";
import { GET_EMPLOYEE_BY_ID } from "../graphql/queries";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

const TimeOffRequest = () => {
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
    /* console.log(dayjs(e.$d).format('YYYY/MM/DD')) */
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
            <table>
              <tbody>
                {employee.timeOffRequests?.map((request) => {
                  return (
                    <tr key={request._id}>
                      <td>
                        {dayjs(request.startDate).format('MM-DD-YYYY')}
                      </td>
                      -<td>{dayjs(request.endDate).format('MM-DD-YYYY')}</td>
                      <td>{request.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Grid>
          <Grid size={8}>
            <DateCalendar
              renderLoading={() => <DayCalendarSkeleton />}
              defaultValue={() => dayjs()}
              onChange={handleOnChange}
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
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};

export default TimeOffRequest;

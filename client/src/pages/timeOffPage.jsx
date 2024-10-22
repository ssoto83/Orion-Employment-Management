import React, { useState } from 'react';
import TimeOffRequest from "../components/TimeOffRequest";
import {useQuery} from "@apollo/client";
import { GET_ME, GET_USERREQUESTS, GET_ALLREQUESTS } from "../utils/queries";
import Auth from "../utils/auth";

const TimeOffPage = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    window.location.assign("/login");
  }
  const { data } = useQuery(GET_ME);
  
  // const [newRequest] = useMutation(CREATETIMEOFFREQUEST)
  const [userRequests] = useQuery(GET_USERREQUESTS);
  const [allRequests] = useQuery(GET_ALLREQUESTS);
  const [showModal, setShowModal] = useState(false);

  const user = data?.me || {};

  const newTORequest = (e) => {
    setShowModal(true);
  };

  const getUserRequests = async () => {
    try {
      const { data } = await userRequests({ variables: { employeeId } });
      return (
        <Box id="all-requests">
          <table id="requests-table-admin">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ _id, startDate, endDate }) => {
                return (
                  <tr key={_id}>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{employeeId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployeesRequest = async () => {
    try {
      const { data } = await allRequests();
      return (
        <Box id="all-requests">
          <table id="requests-table-admin">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  _id,
                  firstname,
                  lastname,
                  employeeId,
                  startDate,
                  endDate,
                }) => {
                  return (
                    <tr key={_id}>
                      <td>
                        {lastname},{firstname}
                      </td>
                      <td>{employeeId}</td>
                      <td>
                        {startDate} - {endDate}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user?.role === "admin" ? (
        { getEmployeesRequest }
      ) : (
        <>
          <button id="new-request-button" onClick={newTORequest}>
            New Request
          </button>
          {getUserRequests()}
          <TimeOffRequest
            userId={user._id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </>
  );
};

export default TimeOffPage;

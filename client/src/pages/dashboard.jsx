import React from 'react';
import './Dashboard.css';
import Stack from '@mui/material/Stack'; // Import styling for the dashboard cards

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Employee Dashboard</h1>
      <div className='dashboard-grid'>
        <div className='dashboard-card'>
          <h3>Profile</h3>
          <p>View and update your employee profile.</p>
        </div>
        <div className='dashboard-card'>
          <h3>Events</h3>
          <p>Check out upcoming events and news.</p>
        </div>
        <div className='dashboard-card'>
          <h3>Time-Off Requests</h3>
          <p>Request time off and view your time-off history.</p>
        </div>
        <div className='dashboard-card'>
          <h3>Tasks</h3>
          <p>View assigned tasks and track progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

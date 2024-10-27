import React from 'react';
import Sidebar from '../components/Sidebar'; // Sidebar component for menu

const TimeOffStatus = () => {
  return (
      <div style={{ display: 'flex' }}>
        {/* Sidebar with Employee-specific menu items */}
        <Sidebar
          menuItems={[
            { name: 'Employee Profile', link: '/employee/profile' },
            { name: 'Request Time Off', link: '/employee/request-time-off' },
            { name: 'View Time Off Status', link: '/employee/time-off-status' },
          ]}
        />
        <div style={{ flexGrow: 1, padding: '20px' }}>
        <h2>View Time Off Status</h2>
      {/* Implement functionality to display time off status */}
      </div>
      </div>
  );
};

export default TimeOffStatus;

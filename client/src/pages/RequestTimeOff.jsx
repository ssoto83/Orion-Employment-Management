import React, {useEffect} from 'react';
import Sidebar from '../components/Sidebar'; // Sidebar component for menu
import TimeOffRequest from '../components/TimeOffRequest';
import Auth from '../utils/auth'
import { useNavigate } from 'react-router-dom';

const RequestTimeOff = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    Auth.loggedIn() ? null : navigate('/login')
  },[])

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with Employee-specific menu items */}
      <Sidebar
        menuItems={[
          { name: 'Employee Profile', link: '/employee/profile' },
          { name: 'Request Time Off', link: '/employee/request-time-off' },
          /* { name: 'View Time Off Status', link: '/employee/time-off-status' }, */
        ]}
      />
      <div style={{ flexGrow: 1, padding: '20px' }}>
      <h2>Request Time Off</h2>
      <TimeOffRequest/>
      </div>
    </div>
  );
};

export default RequestTimeOff;

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import AdminLayout from './components/AdminLayout.jsx'; // Import AdminLayout
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import ViewAllEmployees from './pages/ViewAllEmployees.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import UpdateEmployee from './pages/UpdateEmployee.jsx';
import ApproveTimeOff from './pages/ApproveTimeOff.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';
import RequestTimeOff from './pages/RequestTimeOff.jsx';
import TimeOffStatus from './pages/TimeOffStatus.jsx';
import LoginSignup from './components/LoginSignup.jsx';

const requireAuth = (role) => {
  return ({ element }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return element;
  };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <LoginSignup /> },

      // Admin routes
      {
        path: '/admin',
        element: requireAuth('admin')({ element: <AdminLayout /> }),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'employees', element: <ViewAllEmployees /> },
          { path: 'time-off-requests', element: <ApproveTimeOff /> },
        ],
      },

      // Employee routes
      { path: '/employee-dashboard', element: requireAuth('employee')({ element: <EmployeeDashboard /> }) },
      { path: '/employee/profile', element: requireAuth('employee')({ element: <EmployeeProfile /> }) },
      { path: '/employee/request-time-off', element: requireAuth('employee')({ element: <RequestTimeOff /> }) },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);

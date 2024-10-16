import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeInfoPage from './pages/EmployeeInfoPage.jsx';
import EmployeesPage from './pages/EmployeesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TimeOffPage from './pages/TimeOffPage.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }, 
      {
        path: '/employeesPage',
        element: <EmployeesPage />
      }, 
      {
        path: '/employeeInfoPage',
        element: <EmployeeInfoPage/>
      },
      {
        path: '/loginPage',
        element: <LoginPage/>
      },
      {
        path: '/timeOffPage',
        element: <TimeOffPage/>
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

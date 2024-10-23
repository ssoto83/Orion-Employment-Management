import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'; // Correct the path and filename case
import EmployeesPage from './pages/EmployeesPage.jsx'; // Ensure the path and filename case are correct
// import TimeOffPage from './pages/TimeOffPage.jsx'; // Ensure the path and filename case are correct
import Signup from './pages/SignUp.jsx'; // Correct the path and the component name
import Dashboard from './pages/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/employee',
        element: <EmployeesPage />,
      },
      // {
      //   path: '/timeoff',
      //   element: <TimeOffPage />,
      // },
      {
        path: '/signup',
        element: <Signup />, // Fixed the capitalization of Signup
      },

    ],
  },
]);

// Use createRoot to correctly render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

import ReactDOM from 'react-dom/client'; // Fixed import statement
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'; // Ensure the path is correct for your CSS
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage'; // Import individual components correctly
import Home from './pages/Home';
import LoginPage from './pages/loginPage'; // Add LoginPage import
import EmployeesPage from './pages/employeesPage.jsx';
import TimeOffPage from './pages/timeOffPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginPage />, // Added missing LoginPage element
      },
      {
        path: '/employee',
        element: <EmployeesPage />,
      },
      {
        path: '/timeoff',
        element: <TimeOffPage />,
      },
    ],
  },
]);

// Use createRoot to correctly render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

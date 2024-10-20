import ReactDOM from 'react-dom/client'; // Fixed import statement
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'; // Ensure the path is correct for your CSS
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage'; // Import individual components correctly
import Home from './pages/Home';
import EmployeeUpdate from './pages/EmployeeUpdate';
import AddEmployee from './pages/AddEmployee';
import RequestTimeOff from './pages/RequestTimeOff';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import CompanyEvents from './pages/CompanyEvents';
import LoginPage from './pages/loginPage'; // Add LoginPage import

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <NotFound />, // Properly use NotFound for unknown routes
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
        path: '/register/:id',
        element: <Register />,
      },
      {
        path: '/addemployee',
        element: <AddEmployee />,
      },
      {
        path: '/events',
        element: <CompanyEvents />,
      },
      {
        path: '/timeoff/:id',
        element: <RequestTimeOff />,
      },
      {
        path: '/update/:id',
        element: <EmployeeUpdate />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

// Use createRoot to correctly render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

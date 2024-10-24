import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Correct the path and filename case
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

    ],
  },
]);

// Use createRoot to correctly render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

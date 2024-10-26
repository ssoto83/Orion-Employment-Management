import { useState,useEffect } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Add this import
import Auth from '../utils/auth'

const LoginSignup = () => {
  const navigate = useNavigate();
 /*  useEffect(() => {
    if (Auth.loggedIn()){
      if (localStorage.getItem('role') === 'admin') {
        navigate('/admin');
      } else {
        navigate('/employee-dashboard');
      }
    }
  },[]) */

  const { login } = useAuth(); // Add this hook
  const [tabIndex, setTabIndex] = useState(0);
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  
  const [loginUser] = useMutation(LOGIN);
  const [signupUser] = useMutation(SIGNUP);

  // Handle tab change between login and signup
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setErrorMessage(''); // Reset error message on tab switch
  };

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          username: loginForm.username,
          email: loginForm.email,
          password: loginForm.password,
        },
      });

      const { token, user } = data.login;

      // Use the context's login function instead of direct localStorage
      login(token, user.isAdmin);

      // Redirect based on user role
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle signup submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupUser({
        variables: {
          email: signupForm.email,
          username: signupForm.username,
          password: signupForm.password,
        },
      });

      const { token, user } = data.signup;

      // Use the context's login function
      /* login(token, user.isa); */
      login(token, user.isAdmin);


      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box className="login-signup-container" sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {/* Show error message */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {/* Login Form */}
      {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              name="username"
              label="Username"
              value={loginForm.username}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name='email'
              label='Email'
              value={loginForm.email}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
              Login
            </Button>
          </form>
        </Box>
      )}

      {/* Signup Form */}
      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>Sign Up</Typography>
          <form onSubmit={handleSignupSubmit}>
            <TextField
              name="email"
              label="Email"
              value={signupForm.email}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="username"
              label="Username"
              value={signupForm.username}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default LoginSignup;

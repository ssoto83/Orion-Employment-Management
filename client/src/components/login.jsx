import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import './Login.css';

// import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      ssn: '',
      position: '',
      pay: '',
      password: '',
      StartDate: '',
      isActive: 'false',

    });
  };

  return (
    <Box>
      {data ? (
        <p>
          New Employee?  {' '}
          <Link to="/Registration"></Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className=""
            style={{ cursor: 'pointer' }}
            type="submit"
            >
            Submit
          </button>
        </form>
      )}
        {error && (
        <div className="">
          {error.message}
        </div>
      )}
    </Box >
  );
};


export default Login;




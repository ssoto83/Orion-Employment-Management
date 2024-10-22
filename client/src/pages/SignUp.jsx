import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <Box>
        <div>
          <h4>Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to='/'>back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className='form-input'
                  placeholder='Your username'
                  name='username'
                  type='text'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />

                <button type='submit' variant='contained'>
                  Submit
                </button>
              </form>
            )}

            {error && <div className=''>{error.message}</div>}
          </div>
        </div>
      </Box>
    </main>
  );
};

export default Signup;

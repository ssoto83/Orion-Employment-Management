import React,{ useEffect } from 'react';
import Welcome from '../components/Welcome';
import LoginSignup from '../components/LoginSignup';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth.loggedIn()){
      if (localStorage.getItem('role') === 'admin') {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    }
  },[])
  return (
    <div>
      <div><Welcome /></div>
      
    </div>
  );
};

export default Home;

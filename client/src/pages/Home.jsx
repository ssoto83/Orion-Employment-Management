import React from 'react';
import Welcome from '../components/Welcome';
import LoginSignup from '../components/LoginSignup';
import Grid from "@mui/material/Grid2";
import './Home.css'

const Home = () => {
  
  return (
    <div className='home'>
    <Grid container sx={{display:'flex'}}>
      <Grid size={4} sx={{justifyContent: 'center', alignItems:"center"}}>
        <div><Welcome /></div>
      </Grid>
      <Grid size={4} offset={3}>
        <div className='login-home'>
        <LoginSignup />
      </div>
      </Grid>
    </Grid>
    </div>
  );
};

export default Home;

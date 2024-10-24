import{ Box,Tabs,Tab,Typography,TextField,Button,Alert} from '@mui/material';
import{useMutation}from '@apollo/client';
import{LOGIN_USER}from '../graphql/mutations';
import './Login.css';
import { useState } from 'react';

const Login=()=>{
  const [tabIndex,setTabIndex]=useState(0);
  const [loginForm,setLoginForm]=useState({email:'',username:'',password:''});
  const [singUpForm,setSignUpForm]= userState({email:'', username:'', password:''});
  const [errorMessage,setErrorMessage]=useState('');
  const [loginUser]=useMutation(LOGIN_USER);
  const [signupUser]=useMutation(SIGNUP_USER);

  //Handle form switch
  const handleTabChange=(event,newValue)=>{
    setTabIndex(newValue);
    setErrorMessage('');
  };
  //Handle input change for login form
  const handleLoginChange=(e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value});
  };
  //Handle input change for signup form
  const handleSignupChange=(e)=>{
    setSignUpForm({...singUpForm,[e.target.name]:e.target.value});
  };

  //Login submission
  const handleLoginSubmit=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await loginUser({variables:{...loginForm}});
      localStorage.setItem('token',data.login.token);
      window.location.href='/Home';
    }catch(e){
      setErrorMessage(e.message);
    }
  }
  


}
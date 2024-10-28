import React,{useState,useEffect} from 'react';
import {useMutation,useQuery} from '@apollo/client'
import Sidebar from '../components/Sidebar'; // Sidebar component for menu
import { Box,TextField,Button } from '@mui/material';
import {GET_EMPLOYEE_BY_ID} from '../graphql/queries'
import {UPDATE_EMPLOYEE} from '../graphql/mutations'
import Auth from '../utils/auth'
import { useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    Auth.loggedIn() ? null : navigate('/login')
  },[])
  

  const {loading,data} = useQuery(GET_EMPLOYEE_BY_ID)
  const [update] = useMutation(UPDATE_EMPLOYEE)
  
  const employee = data?.employee || {}
  const [editable,setEditable] = useState({address:"",phoneNumber:"" })

  useEffect(()=> {
    setEditable({address:employee.address,phoneNumber:employee.phoneNumber })
  },[loading])
  const handleChange = (e) => {
    const {name,value} = e.target

    switch(name){
      case 'address':
        setEditable({...editable, address:value})
        break
      case 'phoneNumber':
        setEditable({...editable, phoneNumber:value})
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      if(employee.address != editable.address && employee.phoneNumber != editable.phoneNumber){
        await update({
          variables:{empId: employee._id, address: editable.address,phoneNumber: editable.phoneNumber}
        })
      }
      else if (employee.address != editable.address && employee.phoneNumber === editable.phoneNumber){
        await update({
          variables:{empId: employee._id, address: editable.address}
        })
      }
      else if (employee.address === editable.address && employee.phoneNumber != editable.phoneNumber){
        await update({
          variables:{empId: employee._id, phoneNumber: editable.phoneNumber}
        })
      } 
      else{
        return
      }
    }
    catch{

    }
  }
  if(loading){
    return (
        <div style={{ display: 'flex' }}>
        {/* Sidebar with Employee-specific menu items */}
        <Sidebar
          menuItems={[
            { name: 'Employee Profile', link: '/employee/profile' },
            { name: 'Request Time Off', link: '/employee/request-time-off' },
            /* { name: 'View Time Off Status', link: '/employee/time-off-status' }, */
          ]}
        />
        <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Loading Employee Information...</h1>
        </div>
        </div>
    )
  }
  else{
    return (
      <div style={{ display: 'flex' }}>
        {/* Sidebar with Employee-specific menu items */}
        <Sidebar
          menuItems={[
            { name: 'Employee Profile', link: '/employee/profile' },
            { name: 'Request Time Off', link: '/employee/request-time-off' },
            /* { name: 'View Time Off Status', link: '/employee/time-off-status' }, */
          ]}
        />
        <div style={{ flexGrow: 1, padding: '20px' }}>
  
        <Box sx={{ padding: "20px" }}>
          <h2>Employee Information</h2>
          <form onSubmit={handleSubmit}>
            {/* Disabled Fields */}
            <TextField
              name="firstName"
              variant="outlined"
              fullWidth
              defaultValue={employee.firstName}
              disabled
              margin="normal"
            />
            <TextField
              name="lastName"
              variant="outlined"
              fullWidth
              defaultValue={employee.lastName}
              disabled
              margin="normal"
            />
            <TextField
              name="email"
              variant="outlined"
              fullWidth
              defaultValue={employee.email}
              disabled
              margin="normal"
            />
            <TextField
              name="position"
              variant="outlined"
              fullWidth
              defaultValue={employee.position}
              disabled
              margin="normal"
            />
            <TextField
              name="ssn"
              variant="outlined"
              fullWidth
              defaultValue={employee.ssn}
              disabled
              margin="normal"
            />
            <TextField
              name="pay"
              variant="outlined"
              fullWidth
              defaultValue={employee.pay}
              disabled
              margin="normal"
            />
  
            {/* Editable Fields */}
            <TextField
              name="address"
              placeholder="Address"
              variant="outlined"
              fullWidth
              defaultValue={employee.address}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="phoneNumber"
              placeholder="Phone Number"
              variant="outlined"
              fullWidth
              defaultValue={employee.phoneNumber}
              onChange={handleChange}
              margin="normal"
            />
  
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Update Information
            </Button>
          </form>
        </Box>
        </div>
      </div>
    );
  }
  
};

export default EmployeeProfile;


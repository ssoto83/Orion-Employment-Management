import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, CircularProgress } from '@mui/material';
import { GET_ME, GET_EMPLOYEE_BY_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Sidebar from './Sidebar';
import Auth from '../utils/auth'; // Your existing AuthService

const AdminLayout = () => {
    const navigate = useNavigate();
    const {loading,data} = useQuery(GET_ME)
    const {loading:empLoading,data:empData} = useQuery(GET_EMPLOYEE_BY_ID)
    const [isLoading, setIsLoading] = React.useState(true);
    const [userData, setUserData] = React.useState(null);
    const user = data?.me
    const employee = empData?.employee

    useEffect(() => {
        // Check authentication and get user profile
        const checkAuth = () => {
            if (!Auth.loggedIn()) {
                navigate('/login');
                return;
            }

            /* const profile = Auth.getProfile(); */
            if (user || employee) {
                setUserData({
                    name: `${employee?.firstName} ${employee?.lastName}` || user.username || 'User', // Fallback chain
                    email: user.email,
                    role: 'Employee'
                });
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [loading,empLoading]);

    console.log(userData)
    const menuItems = [
        { name: 'Employee Profile', link: '/employee/profile' },
          { name: 'Request Time Off', link: '/employee/request-time-off' }
    ];

    if (isLoading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Sidebar 
                menuItems={menuItems} 
                user={userData}
            />
            
            <Box sx={{ 
                flexGrow: 1, 
                padding: { xs: 2, md: 4 },
                marginLeft: '0px',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                overflow: 'auto'
            }}>
                <Container maxWidth="xl" sx={{ height: '100%' }}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: { xs: 2, md: 3 },
                            backgroundColor: 'white',
                            borderRadius: 2,
                            minHeight: 'calc(100vh - 48px)',
                            mb: 3
                        }}
                    >
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminLayout;
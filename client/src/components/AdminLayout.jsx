import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar';
import Auth from '../utils/auth'; // Your existing AuthService

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [userData, setUserData] = React.useState(null);

    useEffect(() => {
        // Check authentication and get user profile
        const checkAuth = () => {
            if (!Auth.loggedIn()) {
                navigate('/login');
                return;
            }

            const profile = Auth.getProfile();
            if (profile) {
                setUserData({
                    name: profile.username || profile.name || 'User', // Fallback chain
                    email: profile.email,
                    role: profile.role || 'Admin'
                });
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [navigate]);

    const menuItems = [
        { name: 'Dashboard', link: '/admin' },
        { name: 'View All Employees', link: '/admin/employees' },
        { name: 'Approve Time Off Requests', link: '/admin/time-off-requests' },
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
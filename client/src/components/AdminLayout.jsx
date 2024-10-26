// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const menuItems = [
        { name: 'Dashboard', link: '/admin' },
        { name: 'View All Employees', link: '/admin/employees' },
        { name: 'Approve Time Off Requests', link: '/admin/time-off-requests' },
    ];
    return (
    <div style={{ display: 'flex' }}>
    <Sidebar menuItems={menuItems} />
    <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
    </div>
    </div>
    );
};

export default AdminLayout;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '~/utils/auth';

const RoleBasedRoute = ({ children, allowedRole }) => {
    const userRole = getUserRole();

    if (!userRole) {
        return <Navigate to="/" />;
    }

    if (allowedRole !== userRole) {
        return <Navigate to="/no-permission" />;
    }

    return children;
};

export default RoleBasedRoute;

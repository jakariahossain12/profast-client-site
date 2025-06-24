import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import LoadingSpiner from '../components/LoadingSpine/LoadingSpiner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (!user) {
        return <Navigate to={'/sign-in'}></Navigate>
    }
    if (loading) {
        return <LoadingSpiner></LoadingSpiner>
    }
    


    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;
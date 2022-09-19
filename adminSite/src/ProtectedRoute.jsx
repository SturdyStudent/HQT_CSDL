import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import auth from './auth';

function ProtectedRoute() {
    console.log(auth.isAuthenticated());
    return auth.isAuthenticated() ? <Outlet /> : <Navigate to={'/login'} />
}

export default ProtectedRoute
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const logout = useAuthStore((state) => state.logout);
    let isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    // Check authentication on mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    let token = localStorage.getItem('authToken');
    try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (isExpired) {
            logout();
            isAuthenticated = false;
        }
    } catch (e) {
        logout();
        isAuthenticated = false;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

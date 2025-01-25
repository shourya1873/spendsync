import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './RouteConfig';
import ProtectedRoute from '../components/ProtectedRoute';

// Simulate authentication status (replace with real logic)
const isAuthenticated = localStorage.getItem('authToken'); // Or use a state management library

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        if (route.children) {
            return (
                <Route key={index} path={route.path} element={route.element}>
                    {renderRoutes(route.children)}
                </Route>
            );
        }

        // Wrap protected routes with ProtectedRoute
        if (route.protected) {
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            {route.element}
                        </ProtectedRoute>
                    }
                />
            );
        }

        return <Route key={index} path={route.path} element={route.element} />;
    });
};

const AppRoutes = () => {
    return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;

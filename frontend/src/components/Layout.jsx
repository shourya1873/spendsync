import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header>My App Header</header>
            <main>
                <Outlet /> {/* Render child routes */}
            </main>
            <footer>My App Footer</footer>
        </div>
    );
};

export default Layout;

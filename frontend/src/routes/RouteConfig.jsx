import Home from '../pages/Home';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import Login from "@/pages/Login.jsx";
import SignUp from "@/pages/SignUp.jsx";

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
        protected: true, // Mark route as protected
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;

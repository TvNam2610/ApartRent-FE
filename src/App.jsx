// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './pages/Layout/layout.jsx';
import Home from './pages/Home/Home.jsx';
import PropertyList from './pages/ListProperty/ListProperty.jsx';
import Detail from './pages/DetailPage/Detail.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate.jsx';
import Login from './pages/Login/Login.jsx';
import NewPostPage from './pages/NewPost/NewPost.jsx';

import { listPageLoader, singlePageLoader } from './lib/loaders.js';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />, // No layout wrapper here
        },
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/for-rent',
                    element: <PropertyList />,
                    loader: listPageLoader,
                },
                {
                    path: '/for-buy',
                    element: <PropertyList />,
                    loader: listPageLoader,
                },
                {
                    path: 'posts/:id',
                    element: <Detail />,
                    loader: singlePageLoader,
                },

                {
                    path: '/login',
                    element: <Login />,
                },
            ],
        },
        {
            path: '/',
            element: <RequireAuth />,
            children: [
                {
                    path: '/profile',
                    element: <Profile />,
                },
                {
                    path: '/profile/update',
                    element: <ProfileUpdate />,
                },
                {
                    path: '/profile/add',
                    element: <NewPostPage />,
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}

export default App;

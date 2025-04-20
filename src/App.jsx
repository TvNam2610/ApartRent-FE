// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './pages/Layout/layout.jsx';
import Home from './pages/Home/Home.jsx';
import PropertyList from './pages/ListProperty/ListProperty.jsx';
import Detail from './pages/DetailPage/Detail.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate.jsx';
import Login from './pages/Login/Login.jsx';
import NewPostPage from './pages/NewPost/NewPost.jsx';
import Chat from './pages/Chat/Chat.jsx';
import { listPageLoader, singlePageLoader } from './lib/loaders.js';
import SavedPost from './pages/SavePost/SavePost.jsx';
import Deposit from './pages/Deposit/Deposit.jsx';
import Callback from './pages/Callback/Callback.jsx';
import PostManagementPage from './pages/PostManagement/PostManagement.jsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/profile/add',
            element: <NewPostPage />,
        },
        {
            path: '/seller/post-manager',
            element: <PostManagementPage/>
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/posts',
                    element: <PropertyList />,
                    loader: listPageLoader,
                },
                {
                    path: 'posts/:id',
                    element: <Detail />,
                    loader: singlePageLoader,
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
                    path: '/chat',
                    element: <Chat />,
                },
                {
                    path: '/savePost',
                    element: <SavedPost />,
                },
                {
                    path: '/nap-tien',
                    element: <Deposit />,
                },
                {
                    path: '/callback',
                    element: <Callback />,
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

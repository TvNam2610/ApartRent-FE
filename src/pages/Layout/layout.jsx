import './layout.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import Header from '../../components/Header/header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Layout() {
    return (
        <>
            <Header />
            <div className="layout">
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

function RequireAuth() {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) return <Navigate to="/login" />;
    else {
        return (
            <>
                <Header />

                <div className="layout">
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </>
        );
    }
}

export { Layout, RequireAuth };

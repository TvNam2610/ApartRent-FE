import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/loogo.png';
import { FaBookmark } from 'react-icons/fa';
import './Header.scss';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import apiRequest from '../../lib/apiRequest';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Header = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const handleLogin = () => {
        window.location.href = '/login';
    };
    const handleLogout = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            await apiRequest.post('/auth/logout');
            updateUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header className="header">
            <div>
                <div className="header__logo">
                    <NavLink to="/">
                        <img src={logo} alt="Logo" />
                    </NavLink>
                </div>
                <nav className="header__nav">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/posts">Mua/Thuê</NavLink>
                    <NavLink to="/t">Liên hệ</NavLink>
                    <NavLink to="/d">Khuyến mãi</NavLink>
                    <NavLink to="/d">Tin tức</NavLink>
                    <NavLink to="/f">Hỗ trợ</NavLink>
                </nav>
            </div>
            <div className="header__actions">
                <NavLink to="/savePost">
                    <FaBookmark className="icon" />
                </NavLink>

                {currentUser ? (
                    <div className="user">
                        <Tippy
                            interactive={true}
                            placement="bottom-end"
                            render={(attrs) => (
                                <div className="user-dropdown" tabIndex="-1" {...attrs}>
                                    <NavLink to="/profile" className="dropdown-item">
                                        Hồ sơ
                                    </NavLink>
                                    <NavLink to="/chat" className="dropdown-item">
                                        Chat
                                    </NavLink>
                                    <NavLink onClick={handleLogout} to="/" className="dropdown-item">
                                        Đăng Xuất
                                    </NavLink>
                                </div>
                            )}
                        >
                            <div>
                                <img
                                    src={currentUser.avatar || 'https://www.dotproperty.com.vn/img/no_image.png'}
                                    alt="User"
                                    className="user-avatar"
                                />
                            </div>
                        </Tippy>
                        <div className="notice">3</div>
                    </div>
                ) : (
                    <button onClick={handleLogin} className="login-btn">
                        Đăng nhập
                    </button>
                )}

                <NavLink className="newPost" to="/profile/add">
                    Đăng tin
                </NavLink>
            </div>
        </header>
    );
};

export default Header;

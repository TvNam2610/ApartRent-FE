import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/loogo.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Header.scss';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import apiRequest from '../../lib/apiRequest';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Header = () => {
    const location = useLocation();
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

    const isActive = (pathname) => location.pathname === pathname;
    return (
        <header className="header">
            <div>
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <nav className="header__nav">
                    <Link to="/for-buy" className={isActive('/for-buy') ? 'active' : ''}>
                        Mua
                    </Link>
                    <Link to="/for-rent" className={isActive('/for-rent') ? 'active' : ''}>
                        Thuê
                    </Link>
                    <Link href="#lien-he">Liên hệ</Link>
                    <Link href="#khuyen-mai">Khuyến mãi</Link>
                    <Link href="#tin-tuc">Tin tức</Link>
                    <Link href="#ho-tro">Hỗ trợ</Link>
                    <Link href="#thu-tuc-online">Thủ tục Online</Link>
                </nav>
            </div>
            <div className="header__actions">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                {currentUser ? (
                    <div className="user">
                        <Tippy
                            interactive={true}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className="user-dropdown" tabIndex="-1" {...attrs}>
                                    <Link to="/profile" className="dropdown-item">
                                        Hồ sơ
                                    </Link>
                                    <Link onClick={handleLogout} to="/" className="dropdown-item">
                                        Đăng Xuất
                                    </Link>
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
            </div>
        </header>
    );
};

export default Header;

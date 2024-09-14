import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/img/loogo.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
    const location = useLocation();

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
                <button className="login-btn">Đăng nhập</button>
            </div>
        </header>
    );
};

export default Header;

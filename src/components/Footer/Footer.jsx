import './Footer.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Giới thiệu về Dot Property</h4>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Công việc</li>
                        <li>Quy chế hoạt động</li>
                        <li>Cơ chế giải quyết tranh chấp</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Căn bán</li>
                        <li>Cho thuê</li>
                        <li>Dự án</li>
                        <li>Bất động sản nước ngoài</li>
                        <li>Danh mục Chủ dự án</li>
                        <li>Danh mục căn hộ</li>
                        <li>Danh mục Bất động sản thương mại</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Help</h4>
                    <ul>
                        <li>Liên hệ</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Dữ liệu</h4>
                    <ul>
                        <li>Tính khoản vay</li>
                        <li>Dot Property widgets</li>
                    </ul>
                </div>

                <div className="footer-section footer-social">
                    <h4>Chia sẻ tin rao này</h4>
                    <div className="social-icons">
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>
            </div>

            <div className="footer-lower">
                <div className="footer-group-sites">
                    <h4>Dot Property Group Sites</h4>
                    <ul>
                        <li>Thailand (EN)</li>
                        <li>Thailand (TH)</li>
                        <li>Philippines</li>
                        <li>Malaysia</li>
                        <li>Indonesia</li>
                        <li>Dot Property Group</li>
                        <li>Dot Property International</li>
                        <li>Dot Expo</li>
                    </ul>
                </div>

                <div className="footer-logo">
                    <img src="https://build.dotproperty.com.vn/assets/dotproperty-white-24fd857f.svg" alt="" />
                </div>
            </div>

            <div className="footer-contact">
                <p>
                    Công Ty TNHH Truyền Thông DOT
                    <br />
                    Số ĐKKD 0313887735 do Sở KH&ĐT Tp. Hồ Chí Minh cấp ngày 30/6/2016
                    <br />
                    Địa chỉ: Tầng 5, Tòa nhà IMC, 62 Trần Quang Khải, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh,
                    Việt Nam
                    <br />
                    Email: info@dotproperty.com.vn
                    <br />
                    Hotline: 028 7301 0978
                </p>
                <div className="footer-registration">
                    <img src="https://www.dotproperty.com.vn/img/logos/logoCCDV.png" alt="Đã đăng ký Bộ Công Thương" />
                </div>
            </div>

            <div className="footer-copyright">
                <p>© Copyright 2024 by Dot Property Pte. Ltd. All Rights Reserved. Chính sách bảo mật | Legal notice</p>
                <div className="footer-registration">
                    <img
                        src="https://build.dotproperty.com.vn/assets/lifullconnect-8b6b8766.svg"
                        alt="Đã đăng ký Bộ Công Thương"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

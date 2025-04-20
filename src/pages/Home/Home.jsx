/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

import Banner from '../../components/Banner/banner';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import Image1 from '../../assets/img/apart1.jpg';
import Image2 from '../../assets/img/Magazine.png';
import Image3 from '../../assets/img/apart2.jpg';
import Image4 from '../../assets/img/apart3.jpg';

// import { newsData } from '../../services/data';

import './Home.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/Footer';

function Home() {
    const [showForm, setShowForm] = useState(false);
    const handleRegistrationClick = () => {
        setShowForm(true);
    };

    const handleCloseModal = (e) => {
        if (e.target.classList.contains('modal')) {
            setShowForm(false);
        }
    };
    return (
        <>
            <Header />
            <Banner />
            <section className="registration-section">
                <div className="registration-section__content">
                    <h2 className="registration-section__title">Đăng ký tham quan dự án và căn hộ của chúng tôi</h2>
                    <p className="registration-section__description">
                        Để có được cái nhìn trực quan và chi tiết về các dự án bất động sản mà chúng tôi cung cấp, mời
                        Quý khách đăng ký tham quan trực tiếp. Khám phá các căn hộ và nhà ở đa dạng tại đây để tìm kiếm
                        lựa chọn phù hợp nhất với nhu cầu của bạn.
                    </p>
                    <button onClick={handleRegistrationClick} className="registration-section__button">
                        Đăng ký tham quan
                    </button>
                </div>
                <div className="registration-section__image">
                    <img src={Image1} alt="Tham quan dự án" />
                </div>
                {showForm && (
                    <div className="modal" onClick={handleCloseModal}>
                        <div className="modal-content">
                            <RegisterForm />
                        </div>
                    </div>
                )}
            </section>

            <section className="reasons-section">
                <div className="reasons-images">
                    <img src={Image4} alt="Hoạt động ngoài trời" className="image1" />
                    <img src={Image3} alt="Bữa tiệc vui vẻ" className="image2" />
                </div>

                <div className="reasons-content">
                    <h2>Những lý do nên mua nhà trực tuyến</h2>
                    <ul>
                        <li>Mua nhà trực tiếp từ chủ đầu tư</li>
                        <li>Tiếp cận thông tin minh bạch, đầy đủ</li>
                        <li>Mua nhà mọi lúc, mọi nơi 24/7</li>
                        <li>Được tư vấn chuyên nghiệp, miễn phí</li>
                        <li>Tiết kiệm chi phí và thời gian</li>
                        <li>Hưởng trọn vẹn các ưu đãi và khuyến mãi theo sản phẩm</li>
                        <li>Tìm mua nhà từ quỹ căn đủ nhất với giá tốt nhất</li>
                        <li>Tự tìm, tự chọn, tự mua căn nhà yêu thích</li>
                    </ul>
                </div>
            </section>

            <section className="real-estate-section">
                <div className="real-estate-content">
                    <h3>Introducing the best real estate in Thailand and Vietnam!</h3>
                    <p>
                        The latest issue of Dot Property Magazine is a real winner. That's because we celebrate the
                        winners of the Dot Property Thailand Awards 2020 and Dot Property Vietnam Awards 2020. Among the
                        firms to take home honors was Bridge Estate. Khun Pitchakorn Meesak (Jarn), Bridge Estate
                        Managing Director, shares with readers what it means to be named as one of Thailand’s Best Real
                        Estate Agencies and takes us inside Bangkok’s most exclusive condominium.
                    </p>
                </div>

                <div className="real-estate-image">
                    <img src={Image2} alt="Dot Property Magazine" />
                </div>

                <div className="notification-section">
                    <h4>Nhận thông báo</h4>
                    <p>Trở thành người đầu tiên nhận tin rao mới nhất qua Email theo ưu tiên tìm kiếm của bạn</p>
                    <button className="notify-button">Tạo thông báo</button>
                </div>
            </section>

            <section className="news-section">
                <h2 className="news-title">Tin tức</h2>
                {/* <div className="news-grid">
                    {newsData.map((news, index) => (
                        <div key={index} className="news-item">
                            <img src={news.image} alt={news.title} className="news-image" />
                            <div className="news-content">
                                <h3 className="news-heading">{news.title}</h3>
                                <p className="news-description">{news.description}</p>
                                <span className="news-date">{news.date}</span>
                            </div>
                        </div>
                    ))}
                </div> */}
            </section>
            <Footer />
        </>
    );
}

export default Home;

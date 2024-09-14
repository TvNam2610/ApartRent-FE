import { useState } from 'react';
import './banner.scss';
import { FaSearch } from 'react-icons/fa';

const Banner = () => {
    const [activeOption, setActiveOption] = useState('Mua');

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };
    return (
        <section className="banner">
            <div className="banner__overlay">
                <div className="banner__content">
                    <div className="banner__options">
                        <button
                            className={`banner__button ${activeOption === 'Mua' ? 'active' : ''}`}
                            onClick={() => handleOptionClick('Mua')}
                        >
                            Mua
                        </button>
                        <button
                            className={`banner__button ${activeOption === 'Thuê' ? 'active' : ''}`}
                            onClick={() => handleOptionClick('Thuê')}
                        >
                            Thuê
                        </button>
                    </div>
                    <div className="banner__filters">
                        <input
                            type="text"
                            className="search-form__input"
                            placeholder="Tìm kiếm theo địa điểm, tên căn hộ hoặc từ khóa"
                        />
                        <select className="search-form__select">
                            <option value="">Giá thấp nhất</option>
                            <option value="100000">100,000</option>
                            <option value="200000">200,000</option>
                        </select>
                        <select className="search-form__select">
                            <option value="">Giá cao nhất</option>
                            <option value="500000">500,000</option>
                            <option value="1000000">1,000,000</option>
                        </select>
                        <select className="search-form__select">
                            <option value="">Phòng ngủ</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <button className="banner__search-button">
                    <FaSearch className="fas fa-search"></FaSearch>
                    <span>Tìm kiếm</span>
                </button>
            </div>
        </section>
    );
};

export default Banner;

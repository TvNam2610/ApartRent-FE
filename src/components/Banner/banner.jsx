import { useState } from 'react';
import './banner.scss';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [activeOption, setActiveOption] = useState('Mua');
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const navigate = useNavigate(); // Khởi tạo hàm điều hướng

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    // Hàm điều hướng khi nhấn nút tìm kiếm
    const handleSearch = () => {
        const params = new URLSearchParams();
        params.append('realEstateStatus', activeOption === 'Mua' ? 'FOR_SALE' : 'FOR_RENT');
        if (searchQuery) params.append('searchQuery', searchQuery);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (bedrooms) params.append('bedrooms', bedrooms);

        // Điều hướng đến trang listProperty và truyền các tham số tìm kiếm qua URL
        navigate(`/posts?${params.toString()}`);
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            className="search-form__select"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        >
                            <option value="">Giá thấp nhất</option>
                            <option value="100000">100,000</option>
                            <option value="200000">200,000</option>
                        </select>
                        <select
                            className="search-form__select"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        >
                            <option value="">Giá cao nhất</option>
                            <option value="500000">500,000</option>
                            <option value="1000000">1,000,000</option>
                        </select>
                        <select
                            className="search-form__select"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        >
                            <option value="">Phòng ngủ</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <button
                    className="banner__search-button"
                    onClick={handleSearch} // Khi nhấn nút tìm kiếm, gọi hàm handleSearch
                >
                    <FaSearch className="fas fa-search"></FaSearch>
                    <span>Tìm kiếm</span>
                </button>
            </div>
        </section>
    );
};

export default Banner;

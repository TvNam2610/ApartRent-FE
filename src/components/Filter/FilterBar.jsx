import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FilterBar.scss';

// eslint-disable-next-line react/prop-types
const FilterBar = ({ onFilterChange }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isRentPage = location.pathname === '/for-rent';

    const [transactionType, setTransactionType] = useState('rent');
    const [priceRange, setPriceRange] = useState('');
    const [features, setFeatures] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);

    const featuresList = ['Hồ bơi', 'Phòng gym', 'Chỗ đậu xe', 'Bảo vệ', 'Internet'];

    const handleFilterChange = () => {
        onFilterChange({
            transactionType,
            priceRange,
            features,
            searchQuery,
            bedrooms,
        });
    };
    // Cập nhật giá trị transactionType mỗi khi trang thay đổi (for-rent hoặc for-buy)
    useEffect(() => {
        if (location.pathname === '/for-rent') {
            setTransactionType('rent');
        } else if (location.pathname === '/for-buy') {
            setTransactionType('buy');
        }
    }, [location.pathname]); // Theo dõi sự thay đổi của pathname

    // Gọi hàm handleFilterChange mỗi khi transactionType thay đổi
    useEffect(() => {
        handleFilterChange();
    }, [transactionType, priceRange, features, searchQuery, bedrooms]); // Theo dõi các thay đổi của state

    const handleTransactionTypeChange = (value) => {
        setTransactionType(value);
        handleFilterChange();

        if (value === 'rent') {
            navigate('/for-rent');
        } else if (value === 'buy') {
            navigate('/for-buy');
        }
    };

    const handleFeatureChange = (feature) => {
        if (features.includes(feature)) {
            setFeatures(features.filter((f) => f !== feature));
        } else {
            setFeatures([...features, feature]);
        }
        handleFilterChange();
    };

    return (
        <div className="filter-bar">
            {/* Loại giao dịch */}
            <div className="filter-item filter-trans">
                <select
                    id="transactionType"
                    value={isRentPage ? 'rent' : 'buy'}
                    onChange={(e) => {
                        handleTransactionTypeChange(e.target.value);
                    }}
                >
                    <option value="rent">Cần thuê</option>
                    <option value="buy">Cần mua</option>
                </select>
            </div>

            {/* Tìm kiếm */}
            <div className="filter-item filter-search">
                <input
                    type="text"
                    id="searchQuery"
                    placeholder="Tìm kiếm theo địa điểm, tên căn hộ"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleFilterChange();
                    }}
                />
            </div>

            <div className="filter-item">
                <select
                    id="bedrooms"
                    value={bedrooms}
                    onChange={(e) => {
                        setBedrooms(e.target.value);
                        handleFilterChange();
                    }}
                >
                    {/* Dùng option mặc định để hướng dẫn */}
                    <option value="" disabled hidden>
                        Số phòng ngủ
                    </option>
                    <option value="1">1 phòng ngủ</option>
                    <option value="2">2 phòng ngủ</option>
                    <option value="3">3 phòng ngủ</option>
                    <option value="4+">4+ phòng ngủ</option>
                </select>
            </div>

            {/* Bộ lọc giá */}
            <div className="filter-item">
                <select
                    id="priceRange"
                    value={priceRange}
                    onChange={(e) => {
                        setPriceRange(e.target.value);
                        handleFilterChange();
                    }}
                >
                    <option value="">Mọi giá</option>
                    <option value="0-10000000">Dưới 10 triệu</option>
                    <option value="10000000-50000000">10 - 50 triệu</option>
                    <option value="50000000+">Trên 50 triệu</option>
                </select>
            </div>

            {/* Dropdown checkbox cho Dịch vụ */}
            <div className="filter-item">
                <button className="dropdown-button" onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}>
                    Dịch vụ ({features.length}) <span>{isFeatureDropdownOpen ? '▲' : '▼'}</span>
                </button>
                {isFeatureDropdownOpen && (
                    <div className="dropdown-content">
                        {featuresList.map((feature, index) => (
                            <label key={index} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={feature}
                                    checked={features.includes(feature)}
                                    onChange={() => handleFeatureChange(feature)}
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBar;

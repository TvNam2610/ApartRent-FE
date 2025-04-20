import { useState, useEffect, useRef } from 'react';
import PriceRangeSlider from './PriceRange/PriceRangeSlider';
import './PriceDropdown.scss';

// eslint-disable-next-line react/prop-types
const PriceDropdown = ({ onPriceChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Tham chiếu tới phần tử dropdown

    const handlePriceChange = (range) => {
        const { minPrice, maxPrice } = range;
        onPriceChange({ minPrice, maxPrice });
    };

    // Hàm điều khiển hiển thị dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Hàm xử lý click bên ngoài dropdown để đóng nó
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    // Thêm sự kiện click vào document để lắng nghe click ngoài
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Xóa sự kiện khi component bị hủy
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="price-dropdown" ref={dropdownRef}>
            {/* Ô nhấn "Mức giá" */}
            <button className="dropdown-button" onClick={toggleDropdown}>
                Mức giá <span className="arrow">{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {/* Thanh chọn giá, chỉ hiển thị khi dropdown mở */}
            {isDropdownOpen && (
                <div className="dropdown-content">
                    <PriceRangeSlider onPriceChange={handlePriceChange} />
                </div>
            )}
        </div>
    );
};

export default PriceDropdown;

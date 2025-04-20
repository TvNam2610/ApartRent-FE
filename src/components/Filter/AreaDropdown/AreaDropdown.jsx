import { useState, useEffect, useRef } from 'react';

import './AreaDropdown.scss';
import AreaRangeSlider from './AreaRange/AreaRangeSlider';

// eslint-disable-next-line react/prop-types
export const AreaDropdown = ({ onAreaChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleAreaChange = (range) => {
        const { minArea, maxArea } = range;
        onAreaChange({ minArea, maxArea });
    };
    // Hàm điều khiển mở/đóng dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Đóng dropdown khi nhấp ra ngoài
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="area-dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                Diện tích <span className="arrow">{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDropdownOpen && (
                <div className="dropdown-content">
                    <AreaRangeSlider onAreaChange={handleAreaChange} />
                </div>
            )}
        </div>
    );
};

export default AreaDropdown;

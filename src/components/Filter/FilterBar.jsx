import { useState, useEffect } from 'react';
import './FilterBar.scss';
import PriceDropdown from './PriceDropdown/PriceDropdown';
import BedDropdown from './BedDropdown/BedDropdown';
import AreaDropdown from './AreaDropdown/AreaDropdown';

// eslint-disable-next-line react/prop-types
const FilterBar = ({ onFilterChange }) => {
    const [realEstateStatus, setRealEstateStatus] = useState('');
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [areaRange, setAreaRange] = useState({ minArea: '', maxArea: '' });

    // Hàm cập nhật bộ lọc và gọi callback
    const handleFilterChange = () => {
        onFilterChange({
            realEstateStatus,
            ...priceRange, // Lấy minPrice và maxPrice từ priceRange
            ...areaRange, // Lấy minArea và maxArea từ areaRange
            searchQuery,
            bedrooms,
        });
    };

    useEffect(() => {
        handleFilterChange();
    }, [realEstateStatus, priceRange, areaRange, searchQuery, bedrooms]);

    return (
        <div className="filter-bar">
            {/* Loại giao dịch */}
            <div className="filter-item filter-trans">
                <select
                    id="realEstateStatus"
                    value={realEstateStatus}
                    onChange={(e) => setRealEstateStatus(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    <option value="FOR_RENT">Cần thuê</option>
                    <option value="FOR_SALE">Cần mua</option>
                </select>
            </div>

            {/* Tìm kiếm */}
            <div className="filter-item filter-search">
                <input
                    type="text"
                    id="searchQuery"
                    placeholder="Tìm kiếm theo địa điểm, tên căn hộ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Số phòng ngủ */}
            <BedDropdown onBedChange={(range) => setBedrooms(range)} />

            {/* Bộ lọc giá */}

            <PriceDropdown onPriceChange={(range) => setPriceRange(range)} />

            <AreaDropdown onAreaChange={(range) => setAreaRange(range)} />
        </div>
    );
};

export default FilterBar;

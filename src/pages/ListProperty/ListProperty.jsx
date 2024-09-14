import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/header';
import FilterBar from '../../components/Filter/FilterBar'; // Import FilterBar
import './ListProperty.scss';

function PropertyList() {
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [transactionType, setTransactionType] = useState('rent'); // Mặc định là "rent"
    const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc
    const [allProperties] = useState([
        {
            id: 1,
            title: 'Căn hộ cao cấp 1 phòng ngủ',
            location: 'Quận 1, Hồ Chí Minh',
            price: 30000000, // Giá 30 triệu
            transactionType: 'rent', // Loại giao dịch là "thuê"
            features: ['swimming_pool', 'gym', 'parking'],
            bedrooms: 1, // Số phòng ngủ
        },
        {
            id: 2,
            title: 'Nhà phố 2 phòng ngủ',
            location: 'Quận 2, Hồ Chí Minh',
            price: 5000000, // Giá 5 triệu
            transactionType: 'buy', // Loại giao dịch là "mua"
            features: ['security', 'parking'],
            bedrooms: 2, // Số phòng ngủ
        },
    ]); // Danh sách toàn bộ bất động sản

    // Xác định loại giao dịch (mua/thuê) dựa trên URL
    useEffect(() => {
        if (location.pathname === '/for-rent') {
            setTransactionType('rent');
        } else if (location.pathname === '/for-buy') {
            setTransactionType('buy');
        }
    }, [location.pathname]);

    // Hàm xử lý khi có thay đổi trong FilterBar
    const handleFilterChange = (filters) => {
        const filtered = allProperties.filter((property) => {
            // Lọc theo loại giao dịch
            if (filters.transactionType && filters.transactionType !== property.transactionType) {
                return false;
            }

            if (filters.priceRange && !isWithinPriceRange(property.price, filters.priceRange)) {
                return false;
            }

            // Lọc theo số phòng ngủ
            if (filters.bedrooms && filters.bedrooms !== '' && property.bedrooms.toString() !== filters.bedrooms) {
                return false;
            }

            if (
                filters.searchQuery &&
                !property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
                !property.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
            ) {
                return false;
            }

            // Lọc theo tính năng
            if (filters.features.length > 0) {
                const hasAllFeatures = filters.features.every((feature) => property.features.includes(feature));
                if (!hasAllFeatures) return false;
            }

            return true;
        });

        setFilteredData(filtered);
    };

    // Hàm kiểm tra giá có nằm trong khoảng được chọn không
    const isWithinPriceRange = (price, priceRange) => {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    };

    return (
        <>
            <Header />
            <div className="property-list-page">
                {/* Truyền hàm handleFilterChange cho FilterBar */}
                <FilterBar onFilterChange={handleFilterChange} />

                {/* Danh sách bất động sản đã lọc */}
                <div className="property-list">
                    {filteredData.length > 0 ? (
                        filteredData.map((property) => (
                            <div key={property.id} className="property-card">
                                <h3>{property.title}</h3>
                                <p>{property.location}</p>
                                <p>{property.price} VND</p>
                                <p>{property.bedrooms} phòng ngủ</p>
                                <div className="property-features">
                                    {property.features.map((feature, index) => (
                                        <span key={index}>{feature}</span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có bất động sản nào phù hợp</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PropertyList;

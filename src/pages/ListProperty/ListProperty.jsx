import { useState, useEffect } from 'react';
import { useLocation, useLoaderData } from 'react-router-dom';

// import Footer from '../../components/Footer/Footer';
import FilterBar from '../../components/Filter/FilterBar';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';

import './ListProperty.scss';

function PropertyList() {
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [transactionType, setTransactionType] = useState('rent');
    const { postResponse } = useLoaderData();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (location.pathname === '/for-rent') {
            setTransactionType('rent');
        } else if (location.pathname === '/for-buy') {
            setTransactionType('buy');
        }
    }, [location.pathname]);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const posts = await postResponse;
                console.log('Post response:', posts); // Kiểm tra dữ liệu nhận được
                if (Array.isArray(posts.data)) {
                    setFilteredData(posts.data);
                } else {
                    setFilteredData([]); // Đảm bảo filteredData luôn là mảng
                }
                console.log('Filtered data:', filteredData);
            } catch (error) {
                console.error('Failed to load properties:', error);
                setFilteredData([]); // Đặt mảng rỗng nếu có lỗi
            }
        };

        fetchProperties();
    }, [postResponse]);

    // Hàm xử lý khi có thay đổi trong FilterBar
    const handleFilterChange = (filters) => {
        if (!Array.isArray(filteredData)) {
            console.error('filteredData is not an array');
            return;
        }
        const filtered = filteredData.filter((property) => {
            // Lọc theo loại giao dịch
            if (filters.transactionType && filters.transactionType !== property.priceType) {
                return false;
            }

            // Lọc theo số phòng ngủ
            if (filters.bedrooms && filters.bedrooms !== '' && property.bedrooms.toString() !== filters.bedrooms) {
                return false;
            }

            // Tìm kiếm từ khóa
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

            // Lọc theo khoảng giá
            if (filters.priceRange && !isWithinPriceRange(property.price, filters.priceRange)) {
                return false;
            }

            return true;
        });

        setFilteredData(filtered);
    };

    // Hàm kiểm tra giá có nằm trong khoảng được chọn không
    const isWithinPriceRange = (price, priceRange) => {
        const priceValue = Number(price.replace(/[^\d]/g, ''));
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        return (!minPrice || priceValue >= minPrice) && (!maxPrice || priceValue <= maxPrice);
    };

    return (
        <>
            <div className="property-list-page">
                {/* Truyền hàm handleFilterChange cho FilterBar */}
                <FilterBar onFilterChange={handleFilterChange} />

                <div className="property-list-container">
                    <div className="property-list">
                        {filteredData.length > 0 ? (
                            filteredData.map((property) => (
                                <Card key={property.id} property={property} className="property-card" />
                            ))
                        ) : (
                            <p>Không có bất động sản nào phù hợp</p>
                        )}
                    </div>
                    <div className="mapContainer">
                        <Map properties={filteredData} />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default PropertyList;

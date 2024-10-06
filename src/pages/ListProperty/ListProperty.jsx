import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/Footer';
import FilterBar from '../../components/Filter/FilterBar';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';

import './ListProperty.scss';

function PropertyList() {
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [transactionType, setTransactionType] = useState('rent');
    const [filteredData, setFilteredData] = useState([]);

    const properties = [
        {
            id: 1,
            title: 'Cho thuê căn hộ chung cư 3 phòng ngủ',
            location: 'Cầu Giấy, Hà Nội',
            bedrooms: 3,
            bathrooms: 2,
            area: 127.3,
            floor: 13,
            price: '71,000,000',
            priceType: 'rent',
            features: ['Swimming pool', 'Air conditioning', 'Gym', 'Internet', 'Security', 'Car park'],
            images: [
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTFkNjUzLTZjMzQtN2NjYS05NzMxLTcyZDdlNTA0MDZlZC8wMTkxZDY1My04ZWJhLTcyY2UtOGFkNy05NjY0OTMzNWJmMWMuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZTMwLThlMGQtNzIyNi1hMWQ2LTUwZTgyZTVjYjViYi8wMTkxN2UzMC04Zjc1LTcxMjUtODVhMC01YTIzNjVkZWU4NDQuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
            ],
            isNew: true,
        },
        {
            id: 2,
            title: 'Căn bán căn hộ chung cư 1 phòng ngủ',
            location: 'Thủ Dầu Một, Bình Dương',
            bedrooms: 1,
            bathrooms: 1,
            area: 60,
            floor: 11,
            price: '2.88 tỷ',
            priceType: 'buy',
            features: ['Air conditioning', 'Car park', 'Balcony', 'Built-in wardrobe'],
            images: [
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZTMwLThlMGQtNzIyNi1hMWQ2LTUwZTgyZTVjYjViYi8wMTkxN2UzMC05MDMzLTczOTctYmZmYi02NDAwMmJmYTg2YTYuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZDgxLTQzZTMtNzk5My04MzIzLTg5MmI0Y2YyNjhmYi8wMTkxN2VhMi1kOGY3LTcwNTQtOTEzOS0wZjAxYzNjNmZhMWQuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
            ],
            isNew: false,
        },
        {
            id: 3,
            title: 'Cho thuê căn hộ chung cư 3 phòng ngủ',
            location: 'Hà Nội',
            bedrooms: 3,
            bathrooms: 2,
            area: 127.3,
            floor: 13,
            price: '71,000,000',
            priceType: 'rent',
            features: ['Swimming pool', 'Air conditioning', 'Gym', 'Internet', 'Security', 'Car park'],
            images: [
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTFkNjUzLTZjMzQtN2NjYS05NzMxLTcyZDdlNTA0MDZlZC8wMTkxZDY1My04ZWJhLTcyY2UtOGFkNy05NjY0OTMzNWJmMWMuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
                'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZTMwLThlMGQtNzIyNi1hMWQ2LTUwZTgyZTVjYjViYi8wMTkxN2UzMC04Zjc1LTcxMjUtODVhMC01YTIzNjVkZWU4NDQuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
            ],
            isNew: true,
        },
    ];

    useEffect(() => {
        if (location.pathname === '/for-rent') {
            setTransactionType('rent');
        } else if (location.pathname === '/for-buy') {
            setTransactionType('buy');
        }
    }, [location.pathname]);

    // Hàm xử lý khi có thay đổi trong FilterBar
    const handleFilterChange = (filters) => {
        const filtered = properties.filter((property) => {
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
        const priceValue = Number(price.replace(/[^\d]/g, '')); // Chuyển giá thành số
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        return (!minPrice || priceValue >= minPrice) && (!maxPrice || priceValue <= maxPrice);
    };

    return (
        <>
            <Header />
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
                        <Map properties={filteredData.length > 0 ? filteredData : properties} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PropertyList;

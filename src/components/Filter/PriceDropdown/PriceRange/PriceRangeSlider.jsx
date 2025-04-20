import { useState } from 'react';
import './PriceRange.scss';
// eslint-disable-next-line react/prop-types
const PriceRangeSlider = ({ onPriceChange }) => {
    const [minPrice, setMinPrice] = useState(''); // Giá tối thiểu
    const [maxPrice, setMaxPrice] = useState(''); // Giá tối đa

    // Hàm cập nhật giá trị tối thiểu khi người dùng nhập
    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        setMinPrice(value);
        onPriceChange({ minPrice: value, maxPrice });
    };

    // Hàm cập nhật giá trị tối đa khi người dùng nhập
    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        setMaxPrice(value);
        onPriceChange({ minPrice, maxPrice: value });
    };

    return (
        <div className="price-range-slider">
            <label>Mức giá</label>
            <div className="input-group">
                {/* Ô nhập cho Giá tối thiểu */}
                <input type="number" placeholder="Từ" value={minPrice} onChange={handleMinPriceChange} />
                <span>→</span>
                {/* Ô nhập cho Giá tối đa */}
                <input type="number" placeholder="Đến" value={maxPrice} onChange={handleMaxPriceChange} />
            </div>
            {/* Các mức giá có sẵn cho người dùng lựa chọn nhanh */}
            <div className="preset-ranges">
                <label>
                    <input
                        type="radio"
                        name="priceRange"
                        value=""
                        onChange={() => onPriceChange({ minPrice: '', maxPrice: '' })}
                    />
                    Tất cả mức giá
                </label>

                <label>
                    <input
                        type="radio"
                        name="priceRange"
                        value="1000000-3000000"
                        onChange={() => onPriceChange({ minPrice: '1000000', maxPrice: '3000000' })}
                    />
                    1 - 3 triệu
                </label>
                <label>
                    <input
                        type="radio"
                        name="priceRange"
                        value="3000000-5000000"
                        onChange={() => onPriceChange({ minPrice: '3000000', maxPrice: '5000000' })}
                    />
                    3 - 5 triệu
                </label>
                <label>
                    <input
                        type="radio"
                        name="priceRange"
                        value="5000000-10000000"
                        onChange={() => onPriceChange({ minPrice: '5000000', maxPrice: '10000000' })}
                    />
                    5 - 10 triệu
                </label>
                <label>
                    <input
                        type="radio"
                        name="priceRange"
                        value="10000000-40000000"
                        onChange={() => onPriceChange({ minPrice: '10000000', maxPrice: '40000000' })}
                    />
                    10 - 40 triệu
                </label>
                {/* Có thể thêm các lựa chọn mức giá khác tương tự */}
            </div>
        </div>
    );
};

export default PriceRangeSlider;

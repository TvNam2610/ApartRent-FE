import { useState } from 'react';
import './AreaRange.scss';

// eslint-disable-next-line react/prop-types
const AreaRangeSlider = ({ onAreaChange }) => {
    const [minArea, setMinArea] = useState(''); // Diện tích tối thiểu
    const [maxArea, setMaxArea] = useState(''); // Diện tích tối đa

    // Hàm cập nhật giá trị tối thiểu khi người dùng nhập
    const handleMinAreaChange = (e) => {
        const value = e.target.value;
        setMinArea(value);
        onAreaChange({ minArea: value, maxArea });
    };

    // Hàm cập nhật giá trị tối đa khi người dùng nhập
    const handleMaxAreaChange = (e) => {
        const value = e.target.value;
        setMaxArea(value);
        onAreaChange({ minArea, maxArea: value });
    };

    // Các lựa chọn diện tích có sẵn
    const areaOptions = [
        { label: 'Tất cả diện tích', min: '', max: '' },
        { label: 'Dưới 50m²', min: '0', max: '50' },
        { label: '50 - 100m²', min: '50', max: '100' },
        { label: '100 - 150m²', min: '100', max: '150' },
        { label: '150 - 200m²', min: '150', max: '200' },
        { label: 'Trên 200m²', min: '200', max: '' },
    ];

    return (
        <div className="area-range-slider">
            <label>Diện tích</label>
            <div className="input-group">
                {/* Ô nhập cho diện tích tối thiểu */}
                <input type="number" placeholder="Từ" value={minArea} onChange={handleMinAreaChange} />
                <span>→</span>
                {/* Ô nhập cho diện tích tối đa */}
                <input type="number" placeholder="Đến" value={maxArea} onChange={handleMaxAreaChange} />
            </div>
            {/* Các diện tích có sẵn cho người dùng lựa chọn nhanh */}
            <div className="preset-ranges">
                {areaOptions.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="areaRange"
                            value={`${option.min}-${option.max}`}
                            onChange={() => onAreaChange({ minArea: option.min, maxArea: option.max })}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default AreaRangeSlider;

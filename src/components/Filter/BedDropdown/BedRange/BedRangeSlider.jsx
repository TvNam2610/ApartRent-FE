import { useState } from 'react';
import './BedRange.scss';

// eslint-disable-next-line react/prop-types
const BedRangeSlider = ({ onBedChange }) => {
    const [selectedBed, setSelectedBed] = useState(null);

    // Hàm cập nhật số phòng ngủ khi người dùng chọn
    const handleBedChange = (beds) => {
        setSelectedBed(beds);
        onBedChange(beds);
    };

    return (
        <div className="bed-range-slider">
            <label>Số phòng ngủ</label>
            <div className="bed-options">
                {[1, 2, 3, 4, '5+'].map((bed, index) => (
                    <button
                        key={index}
                        className={`bed-option ${selectedBed === bed ? 'selected' : ''}`}
                        onClick={() => handleBedChange(bed)}
                    >
                        {bed}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BedRangeSlider;

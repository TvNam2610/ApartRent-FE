import { useState, useEffect } from 'react';
import './AddLocation.scss';

// eslint-disable-next-line react/prop-types
const AddressSelector = ({ onAddressChange }) => {
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState('');
    const [selectedQuan, setSelectedQuan] = useState('');
    const [selectedPhuong, setSelectedPhuong] = useState('');

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setTinh(data.data);
                }
            });
    }, []);

    useEffect(() => {
        if (!selectedTinh) {
            setQuan([]);
            setPhuong([]);
            return;
        }
        fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setQuan(data.data);
                    setPhuong([]);
                }
            });
    }, [selectedTinh]);

    useEffect(() => {
        if (!selectedQuan) {
            setPhuong([]);
            return;
        }
        fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setPhuong(data.data);
                }
            });
    }, [selectedQuan]);

    useEffect(() => {
        if (onAddressChange) {
            const selectedAddress = {
                city: tinh.find((item) => item.id === selectedTinh)?.full_name || '',
                district: quan.find((item) => item.id === selectedQuan)?.full_name || '',
                ward: phuong.find((item) => item.id === selectedPhuong)?.full_name || '',
            };
            console.log('Selected Address:', selectedAddress); // Log dữ liệu địa chỉ
            onAddressChange(selectedAddress);
        }
    }, [selectedTinh, selectedQuan, selectedPhuong]);

    return (
        <div className="css_select_div">
            <select
                className="css_select"
                id="tinh"
                value={selectedTinh}
                onChange={(e) => setSelectedTinh(e.target.value)}
                title="Chọn Tỉnh Thành"
            >
                <option value="">Tỉnh Thành</option>
                {tinh.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.full_name}
                    </option>
                ))}
            </select>

            <select
                className="css_select"
                id="quan"
                value={selectedQuan}
                onChange={(e) => setSelectedQuan(e.target.value)}
                title="Chọn Quận Huyện"
                disabled={!selectedTinh}
            >
                <option value="">Quận Huyện</option>
                {quan.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.full_name}
                    </option>
                ))}
            </select>

            <select
                className="css_select"
                id="phuong"
                value={selectedPhuong}
                onChange={(e) => setSelectedPhuong(e.target.value)}
                title="Chọn Phường Xã"
                disabled={!selectedQuan}
            >
                <option value="">Phường Xã</option>
                {phuong.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.full_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AddressSelector;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
    const [message, setMessage] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();

    // Lấy thông tin từ URL query string (như orderCode, status, userId, amount)
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const amount = queryParams.get('amount');
    const userId = queryParams.get('userId'); // Nếu có userId trong query string

    useEffect(() => {
        // Nếu có status, thực hiện gọi API để xử lý callback
        if (status) {
            const fetchCallbackData = async () => {
                try {
                    // Gửi request đến backend để xử lý callback
                    console.log('Fetching callback data with:', userId, amount, status);
                    const response = await axios.post(
                        `http://localhost:8800/api/wallet/callback?userId=${userId}&amount=${amount}&status=${status}`,
                    );

                    // Kiểm tra trạng thái từ server và hiển thị thông báo cho người dùng
                    if (response.status === 200) {
                        setPaymentStatus('success');
                        setMessage('Thanh toán thành công.');
                    } else {
                        setPaymentStatus('failed');
                        setMessage('Thanh toán thất bại.');
                    }
                } catch (error) {
                    console.error('Error processing callback:', error);
                    setPaymentStatus('failed');
                    setMessage('Lỗi trong quá trình xử lý callback.');
                }
            };

            fetchCallbackData();
        }
    }, [status, userId, amount]);

    return (
        <div className="callback-container">
            <h2>Trạng thái thanh toán</h2>
            {paymentStatus === 'success' && <p style={{ color: 'green' }}>{message}</p>}
            {paymentStatus === 'failed' && <p style={{ color: 'red' }}>{message}</p>}
            {paymentStatus === null && <p>Đang chờ kết quả thanh toán...</p>}
        </div>
    );
};

export default Callback;

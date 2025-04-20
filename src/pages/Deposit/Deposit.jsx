import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext'; // Giả sử bạn có AuthContext để lấy thông tin người dùng
import axios from 'axios';
import './Deposit.scss';

function Deposit() {
    const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng hiện tại
    const [amount, setAmount] = useState(''); // Số tiền người dùng muốn nạp
    const [selectedAmount, setSelectedAmount] = useState(null); // Lưu lựa chọn nhanh
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const [balance, setBalance] = useState(0); // Số dư ví hiện tại
    const [paymentStatus, setPaymentStatus] = useState(null); // Trạng thái thanh toán (thành công / thất bại)
    const [errorMessage, setErrorMessage] = useState(''); // Lỗi nếu có

    // Lấy thông tin ví người dùng từ API
    const fetchWallet = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/wallet/${currentUser.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setBalance(response.data.data.balance);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin ví:', error);
            alert('Không thể lấy thông tin ví. Vui lòng thử lại sau!');
        }
    };

    useEffect(() => {
        fetchWallet(); // Lấy thông tin ví khi component render
    }, []); // Mỗi lần render, chúng ta gọi API để lấy ví

    // Kiểm tra URL để xác nhận việc thanh toán thành công
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('status'); // Lấy status từ query params
        const amountPaid = urlParams.get('amount'); // Lấy amount từ query params

        if (paymentStatus === 'PAID' && amountPaid) {
            // Nếu thanh toán thành công, lấy lại thông tin ví
            setPaymentStatus('success');
            fetchWallet(); // Lấy lại số dư ví mới
        } else if (paymentStatus === 'FAILED') {
            // Nếu thanh toán thất bại
            setPaymentStatus('failed');
            setErrorMessage('Thanh toán thất bại. Vui lòng thử lại.');
        }
    }, []); // Chạy khi component được load lại sau khi thanh toán

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setSelectedAmount(null); // Nếu người dùng nhập tay, bỏ chọn lựa chọn nhanh
    };

    const handleSelectAmount = (value) => {
        setAmount(value);
        setSelectedAmount(value); // Đánh dấu lựa chọn nhanh
    };

    const handleSubmit = async () => {
        if (!amount || amount <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        try {
            setIsLoading(true); // Bắt đầu trạng thái loading
            // Gửi yêu cầu đến backend để lấy URL thanh toán
            const response = await axios.post('http://localhost:8800/api/wallet/deposit', {
                userId: currentUser.id,
                amount: parseInt(amount),
            });

            if (response.data.paymentUrl) {
                // Chuyển hướng đến URL thanh toán của PayOS
                window.location.href = response.data.paymentUrl;
            } else {
                alert('Không thể tạo URL thanh toán. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu thanh toán:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    };

    return (
        <div className="deposit">
            <div className="deposit-header">
                <h2>Nạp tiền</h2>
                <p>
                    Số dư tài khoản của bạn hiện tại: <b>{balance.toLocaleString()} VNĐ</b>
                </p>
            </div>

            {paymentStatus === 'success' && (
                <div className="payment-success">
                    <h3>Thanh toán thành công!</h3>
                    <p>
                        Số tiền đã được nạp vào ví của bạn. Số dư mới là: <b>{balance.toLocaleString()} VNĐ</b>
                    </p>
                </div>
            )}

            {paymentStatus === 'failed' && (
                <div className="payment-error">
                    <h3>{errorMessage}</h3>
                    <p>Vui lòng thử lại sau.</p>
                </div>
            )}

            <div className="deposit-form">
                <label htmlFor="amount">Nhập số tiền bạn muốn nạp (đ):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Ví dụ: 2.000.000 đ để nhận khuyến mãi"
                />

                <div className="quick-select">
                    <h3>Hoặc chọn nhanh</h3>
                    <div className="quick-select-options">
                        {[100000, 300000, 500000, 1000000, 2000000, 3000000, 5000000].map((value) => (
                            <button
                                key={value}
                                className={`option ${selectedAmount === value ? 'selected' : ''}`}
                                onClick={() => handleSelectAmount(value)}
                            >
                                {value.toLocaleString()} đ
                            </button>
                        ))}
                    </div>
                </div>

                <div className="transaction-info">
                    <p>
                        <strong>Thời hạn sử dụng tiền:</strong>
                    </p>
                    <ul>
                        <li>Tài khoản chính: 12 tháng</li>
                        <li>Tài khoản khuyến mãi: Tối đa 6 tháng</li>
                    </ul>
                </div>

                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
                >
                    {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
                </button>
            </div>
        </div>
    );
}

export default Deposit;

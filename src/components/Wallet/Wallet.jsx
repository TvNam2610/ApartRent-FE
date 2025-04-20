import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet.scss';
import { AuthContext } from '../../context/authContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

const Wallet = () => {
    const { currentUser } = useContext(AuthContext);
    const [balance, setBalance] = useState({ main: 0, bonus: 0 }); // Sử dụng state để lưu trữ số dư chính và khuyến mãi
    const [copySuccess, setCopySuccess] = useState(false); // Trạng thái copy mã chuyển khoản
    const navigate = useNavigate();
    // Lấy thông tin ví của người dùng từ API
    const fetchWallet = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/wallet/?userId=${currentUser.id}`);
            if (response.data) {
                setBalance({
                    main: response.data[0].balance, // Lưu số dư chính
                    bonus: response.data[0].bonus || 0, // Lưu số dư khuyến mãi nếu có
                });
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin ví:', error);
            alert('Không thể lấy thông tin ví. Vui lòng thử lại sau!');
        }
    };

    useEffect(() => {
        if (currentUser.id) {
            fetchWallet(); // Lấy số dư ví khi component được render
        }
    }, [currentUser.id]);

    const handleCopy = () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset lại thông báo sau 2s
    };

    const handleNap = () => {
        navigate('/nap-tien');
    };

    return (
        <div className="wallet">
            <h2>Số dư tài khoản</h2>
            <div className="wallet-balance">
                <div className="wallet-item">
                    <span>TK Chính</span>
                    <b>{balance.main.toLocaleString()} VNĐ</b>
                </div>
                <div className="wallet-item">
                    <span>TK Khuyến mãi</span>
                    <b>{balance.bonus.toLocaleString()} VNĐ</b>
                </div>
            </div>
            <div className="wallet-transfer">
                <span>Mã chuyển khoản</span>
                <div className="transfer-code">
                    <b>{currentUser.wallet?.transferCode || 'ABC12364'}</b>
                    <CopyToClipboard text={currentUser.wallet?.transferCode || ''} onCopy={handleCopy}>
                        <button className="copy-button">📋</button>
                    </CopyToClipboard>
                </div>
                {copySuccess && <span className="copy-success">Đã sao chép!</span>}
            </div>
            <button onClick={handleNap} className="recharge-button">
                <span>💳</span> <span>Nạp tiền</span>
            </button>
        </div>
    );
};

export default Wallet;

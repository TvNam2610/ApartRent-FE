/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { toast } from 'react-toastify';
import './NewPost.scss';
import { formatCurrency } from '../../lib/formatCurrency';

const Step6Confirm = ({ formData, setFormData, onPrev }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await apiRequest.get(`/wallet/?userId=${user.id}`);
                setBalance(res.data[0].balance);
            } catch (err) {
                console.error('Failed to fetch wallet balance', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, [user.id]);

    const isEnough = balance !== null && balance >= formData.amount;

    const handleSubmit = async () => {
        if (!isEnough) {
            toast.error('Ví của bạn không đủ tiền để đăng tin này!');
            return;
        }

        try {
            // 1. Tạo bài đăng
            await apiRequest.post('/posts/create', {
                ...formData,
                userId: user.id,
            });

            // 2. Trừ tiền
            await apiRequest.post('/wallet/deduct', {
                userId: user.id,
                balance: formData.amount,
            });

            // 3. Ghi lịch sử giao dịch
            await apiRequest.post('/transaction/log', {
                userId: user.id,
                amount: formData.amount,
                type: 'debit',
                description: `Đăng tin bất động sản với gói ${formData.packageType}`,
            });

            toast.success('🎉 Đăng tin thành công!');
            localStorage.removeItem('newPostStep');
            navigate('/profile');
        } catch (error) {
            console.error(error);
            toast.error('❌ Có lỗi xảy ra khi đăng tin. Vui lòng thử lại.');
        }
    };

    return (
        <div className="form-card p-4">
            {/* <h4 className="mb-4 fw-bold">📦 Xác nhận & Thanh toán</h4> */}

            <div className="row g-4">
                {/* THÔNG TIN BÀI ĐĂNG */}
                <div className="col-md-6">
                    <div className="border rounded shadow-sm p-3">
                        <h6 className="text-uppercase text-muted mb-3">📝 Thông tin bài đăng</h6>
                        <p>
                            <strong>Tiêu đề:</strong> {formData.title || '-'}
                        </p>
                        <p>
                            <strong>Loại tin:</strong>{' '}
                            {formData.packageType === 'daily'
                                ? 'Trả theo ngày'
                                : formData.packageType === 'click'
                                ? 'Trả theo click'
                                : 'Trả theo khách'}
                        </p>
                        <p>
                            <strong>Mục đích:</strong>{' '}
                            {formData.type === 'FOR_SALE' ? 'Bán' : formData.type === 'FOR_RENT' ? 'Cho thuê' : '-'}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {formData.location || '-'}
                        </p>
                        <p>
                            <strong>Diện tích:</strong> {formData.area} m²
                        </p>
                        <p>
                            <strong>Phòng ngủ / Tầng:</strong> {formData.bedrooms} PN / {formData.floor} tầng
                        </p>
                        <p>
                            <strong>Giá BĐS:</strong>{' '}
                            <span className="text-primary">{formatCurrency(formData.price)}</span>
                        </p>
                        <p>
                            <strong>Ngày bắt đầu:</strong> {formData.startDate || '-'}
                        </p>
                        <p>
                            <strong>
                                {formData.packageType === 'daily'
                                    ? 'Số ngày:'
                                    : formData.packageType === 'click'
                                    ? 'Số lượt click:'
                                    : 'Số khách tiềm năng:'}
                            </strong>{' '}
                            {formData.packageType === 'daily'
                                ? formData.days
                                : formData.packageType === 'click'
                                ? formData.clicks
                                : formData.guests}{' '}
                            {formData.packageType === 'daily'
                                ? 'ngày'
                                : formData.packageType === 'click'
                                ? 'click'
                                : 'khách'}
                        </p>
                    </div>
                </div>

                {/* THÔNG TIN THANH TOÁN */}
                <div className="col-md-6">
                    <div className="border rounded shadow-sm p-3">
                        <h6 className="text-uppercase text-muted mb-3">💰 Thông tin thanh toán</h6>
                        <p>
                            <strong>Gói tin:</strong>{' '}
                            <span className="badge bg-primary text-light">{formData.packageType}</span>
                        </p>
                        <p>
                            <strong>Tổng thanh toán:</strong>{' '}
                            <span className="text-danger fs-5">{formatCurrency(formData.amount)}</span>
                        </p>
                        <p>
                            <strong>Số dư ví:</strong>{' '}
                            {loading ? (
                                'Đang kiểm tra...'
                            ) : (
                                <span className={isEnough ? 'text-success' : 'text-danger'}>
                                    {formatCurrency(balance)} {isEnough ? '(Đủ tiền)' : '(Không đủ tiền)'}
                                </span>
                            )}
                        </p>
                        {!isEnough && (
                            <p className="text-warning mt-3">⚠️ Vui lòng nạp thêm tiền để hoàn tất thanh toán.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Nút điều hướng */}
            <div className="bottom-nav mt-4">
                <button className="prev-btn btn-outline" onClick={onPrev}>
                    ← Quay lại
                </button>
                <button className={`next-btn ${isEnough ? 'active' : ''}`} disabled={!isEnough} onClick={handleSubmit}>
                    Xác nhận & Đăng tin
                </button>
            </div>
        </div>
    );
};

export default Step6Confirm;

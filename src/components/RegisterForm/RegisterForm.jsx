/* eslint-disable react/prop-types */
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { toast } from 'react-toastify';

const RegisterForm = ({ onClose, postTitle, postId, postUsername, ownerEmail }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        visitDate: '',
        visitTime: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email || !formData.visitDate || !formData.visitTime) {
            toast.warning('Vui lòng điền đầy đủ các trường bắt buộc!');
            return;
        }

        const payload = {
            ...formData,
            postId,
            postTitle,
            username: postUsername,
            ownerEmail,
        };

        try {
            setSubmitting(true);
            const res = await apiRequest.post('/posts/register', payload);

            if (res.data.success) {
                toast.success('🎉 Đăng ký tham quan thành công!');
                onClose();
            } else {
                toast.error(res.data.message || 'Đăng ký thất bại!');
            }
        } catch (err) {
            console.error('Lỗi gửi đăng ký:', err);
            toast.error('❌ Không thể gửi đăng ký. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Họ tên <span className="text-danger">*</span></label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email <span className="text-danger">*</span></label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Ngày tham quan <span className="text-danger">*</span></label>
                <input
                    type="date"
                    name="visitDate"
                    className="form-control"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Giờ tham quan <span className="text-danger">*</span></label>
                <input
                    type="time"
                    name="visitTime"
                    className="form-control"
                    value={formData.visitTime}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Lời nhắn (tuỳ chọn)</label>
                <textarea
                    name="message"
                    className="form-control"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Bạn có ghi chú gì không?"
                ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    ❌ Hủy
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Đang gửi...' : '📨 Gửi đăng ký'}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;

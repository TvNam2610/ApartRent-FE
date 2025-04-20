/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './NewPost.scss';

function Step1GeneralInfo({ formData, setFormData, onNext }) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const valid = formData.type && formData.title.trim() && parseFloat(formData.price) > 0;
        setIsValid(valid);
    }, [formData]);

    return (
        <>
            <div className="form-card">
                <Form.Label className="mb-2 fw-bold">Nhu cầu</Form.Label>
                <Row className="mb-3">
                    <Col md={6}>
                        <div
                            className={`purpose-option ${formData.type === 'FOR_SALE' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, type: 'FOR_SALE' })}
                        >
                            Bán
                        </div>
                    </Col>
                    <Col md={6}>
                        <div
                            className={`purpose-option ${formData.type === 'FOR_RENT' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, type: 'FOR_RENT' })}
                        >
                            Cho thuê
                        </div>
                    </Col>
                </Row>

                {formData.type && (
                    <>
                        <Form.Group className="form-section">
                            <Form.Label className="fw-bold">Tiêu đề bài đăng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="VD: Căn hộ 2PN, view đẹp, giá tốt"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="form-section">
                            <Form.Label className="fw-bold">Giá bán (VND)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập giá bán..."
                                value={formData.price.toLocaleString('vi-VN')}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/[^\d]/g, ''); // chỉ giữ số
                                    const numericValue = parseInt(rawValue || '0');
                                    setFormData({ ...formData, price: numericValue });
                                }}
                            />
                        </Form.Group>
                    </>
                )}
            </div>

            <div className="bottom-nav">
                <button className={`next-btn ${isValid ? 'active' : ''}`} onClick={onNext} disabled={!isValid}>
                    TIẾP TỤC
                </button>
            </div>
        </>
    );
}

export default Step1GeneralInfo;

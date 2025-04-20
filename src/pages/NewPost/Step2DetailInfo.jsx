/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './NewPost.scss';

function Step2DetailInfo({ formData, setFormData, onNext, onPrev }) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      Number(formData.bedrooms) > 0 &&
      Number(formData.bathrooms) > 0 &&
      Number(formData.area) > 0 &&
      Number(formData.floor) > 0 &&
      formData.features.trim() !== '';
    setIsValid(valid);
  }, [formData]);

  const handleChange = (field, value) => {
    const numberFields = ['bedrooms', 'bathrooms', 'area', 'floor'];

    // Validate số dương
    if (numberFields.includes(field)) {
      if (value < 0) {
        toast.warning(`${field} không được là số âm`);
        value = 0;
      }
      if (value === '') {
        toast.warning(`Vui lòng nhập ${field}`);
      }
    }

    if (field === 'features' && value.trim() === '') {
      toast.warning('Vui lòng nhập thông tin tiện ích nổi bật');
    }

    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (!isValid) {
      toast.error('Vui lòng điền đầy đủ và hợp lệ tất cả các trường!');
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="form-card">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Số phòng ngủ</Form.Label>
              <Form.Control
                type="number"
                placeholder="VD: 2"
                value={formData.bedrooms}
                onChange={(e) => handleChange('bedrooms', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Số phòng tắm</Form.Label>
              <Form.Control
                type="number"
                placeholder="VD: 1"
                value={formData.bathrooms}
                onChange={(e) => handleChange('bathrooms', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Diện tích (m²)</Form.Label>
              <Form.Control
                type="number"
                placeholder="VD: 68.5"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Số tầng</Form.Label>
              <Form.Control
                type="number"
                placeholder="VD: 12"
                value={formData.floor}
                onChange={(e) => handleChange('floor', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Tiện ích nổi bật</Form.Label>
          <Form.Control
            type="text"
            placeholder="VD: Gần trường học, chợ, công viên..."
            value={formData.features}
            onChange={(e) => handleChange('features', e.target.value)}
          />
        </Form.Group>
      </div>

      <div className="bottom-nav">
        <button className="prev-btn btn-outline" onClick={onPrev}>
          Quay lại
        </button>
        <button className={`next-btn ${isValid ? 'active' : ''}`} onClick={handleNext}>
          TIẾP TỤC
        </button>
      </div>
    </>
  );
}

export default Step2DetailInfo;

/* eslint-disable react/prop-types */
import { Form } from 'react-bootstrap';
import './NewPost.scss';
import { toast } from 'react-toastify';

function Step4ContactInfo({ formData, setFormData, onNext, onPrev }) {
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^(03|05|07|08|09)[0-9]{8}$/;
    return regex.test(phone);
  };

  const handleNext = () => {
    if (!formData.contactName.trim()) {
      toast.error('Vui lòng nhập họ và tên!');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại!');
      return;
    }

    if (!validatePhone(formData.phone.trim())) {
      toast.error('Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng số điện thoại Việt Nam.');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Vui lòng nhập email!');
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      toast.error('Định dạng email không hợp lệ!');
      return;
    }

    onNext();
  };

  return (
    <>
      <div className="form-card">
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            placeholder="097xxxxxxx"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Group>
      </div>

      <div className="bottom-nav">
        <button className="prev-btn btn-outline" onClick={onPrev}>
          Quay lại
        </button>
        <button className="next-btn active" onClick={handleNext}>
          TIẾP TỤC
        </button>
      </div>
    </>
  );
}

export default Step4ContactInfo;

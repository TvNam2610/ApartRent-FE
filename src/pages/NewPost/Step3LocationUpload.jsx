/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import './NewPost.scss';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function Step3LocationUpload({ formData, setFormData, onNext, onPrev }) {
  const [previewIndex, setPreviewIndex] = useState(null);

  const openPreview = (index) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  const handleNextImage = () => {
    setPreviewIndex((prev) => (prev + 1) % formData.images.length);
  };

  const handlePrevImage = () => {
    setPreviewIndex((prev) => (prev - 1 + formData.images.length) % formData.images.length);
  };

  const handleNext = () => {
    if (!formData.location.trim()) {
      toast.error('Vui lòng nhập địa chỉ!');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Vui lòng nhập mô tả ngắn!');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Vui lòng nhập mô tả chi tiết!');
      return;
    }
    if (!Array.isArray(formData.images) || formData.images.length === 0) {
      toast.error('Vui lòng tải lên ít nhất 1 hình ảnh!');
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="form-card">
        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            placeholder="VD: 123 Trần Duy Hưng, Cầu Giấy, Hà Nội"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả ngắn</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="VD: Căn hộ đầy đủ nội thất, gần trung tâm..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả chi tiết</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Thông tin chi tiết căn hộ..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hình ảnh căn hộ</Form.Label>
          <div className="mb-2">
            <UploadWidget
              uwConfig={{
                cloudName: 'dnreglgpk',
                uploadPreset: 'apartrent',
                folder: 'posts',
                multiple: true,
                sources: ['local', 'url', 'camera'],
              }}
              setState={(imageUrl) =>
                setFormData((prev) => ({
                  ...prev,
                  images: [...(Array.isArray(prev.images) ? prev.images : []), imageUrl],
                }))
              }
            />
          </div>

          <div className="d-flex flex-wrap gap-2 mt-3">
            {formData.images.map((img, idx) => (
              <div key={idx} className="image-preview position-relative">
                <img
                  src={img}
                  alt={`upload-${idx}`}
                  className="rounded shadow-sm"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => openPreview(idx)}
                />
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0"
                  onClick={() => {
                    const updated = [...formData.images];
                    updated.splice(idx, 1);
                    setFormData((prev) => ({ ...prev, images: updated }));
                  }}
                />
              </div>
            ))}
          </div>
        </Form.Group>
      </div>

      {/* Preview Modal */}
      <Modal show={previewIndex !== null} onHide={closePreview} centered size="lg">
        <Modal.Body className="text-center">
          {previewIndex !== null && (
            <div>
              <img
                src={formData.images[previewIndex]}
                alt={`preview-${previewIndex}`}
                style={{ maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
              />
              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={handlePrevImage}>
                  ← Trước
                </button>
                <button className="btn btn-outline-secondary" onClick={handleNextImage}>
                  Tiếp →
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

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

export default Step3LocationUpload;

/* eslint-disable react/prop-types */
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function EditPostModal({ show, onHide, post, onSave }) {
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(post || {});
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>✏️ Chỉnh sửa bài đăng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control name="title" value={form.title || ''} onChange={handleChange} />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control name="location" value={form.location || ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Giá bất động sản</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={form.price || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả chi tiết</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="description"
                            value={form.description || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    💾 Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPostModal;

/* eslint-disable react/prop-types */
import { Row, Col, Form } from 'react-bootstrap';

function PostFilterBar({ filters, onFiltersChange }) {
  const handleChange = (e) => {
    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="mb-4">
      <Row className="g-3 align-items-end">
        <Col md={6}>
          <Form.Label>Tìm kiếm</Form.Label>
          <Form.Control
            type="search"
            name="keyword"
            placeholder="🔍 Nhập tiêu đề hoặc địa chỉ..."
            value={filters.keyword}
            onChange={handleChange}
            className="form-control-lg"
          />
        </Col>

        <Col md={3}>
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" value={filters.status} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="APPROVED">Đang hiển thị</option>
            <option value="HIDDEN">Đã ẩn</option>
            <option value="EXPIRED">Hết hạn</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label>Loại gói tin</Form.Label>
          <Form.Select name="packageType" value={filters.packageType} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="daily">Trả theo ngày</option>
            <option value="click">Trả theo click</option>
            <option value="guest">Trả theo khách</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}

export default PostFilterBar;

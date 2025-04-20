/* eslint-disable react/prop-types */
import { Table, Spinner, Dropdown, Badge } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { formatCurrency } from '../../lib/formatCurrency';
import './PostTable.scss';

const PostTable = ({ posts, loading, onEdit, onHide, onDelete, onView }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  const renderPackageType = (type) => {
    const label = type === 'daily' ? 'Trả ngày' : type === 'click' ? 'Trả click' : 'Trả khách';
    return <Badge bg="info" className="text-uppercase small">{label}</Badge>;
  };

  const renderStatus = (status) => {
    const statusMap = {
      PENDING: { text: 'Chờ duyệt', variant: 'warning' },
      APPROVED: { text: 'Đang hiển thị', variant: 'success' },
      active: { text: 'Đang hiển thị', variant: 'success' },
      REJECTED: { text: 'Từ chối', variant: 'danger' },
      EXPIRED: { text: 'Hết hạn', variant: 'secondary' },
      HIDDEN: { text: 'Đã ẩn', variant: 'dark' },
    };
    const { text, variant } = statusMap[status] || { text: 'Không rõ', variant: 'light' };
    return <Badge bg={variant} className="text-capitalize small">{text}</Badge>;
  };

  return (
    <div className="table-container shadow-sm rounded overflow-hidden">
      <Table hover responsive borderless className="align-middle">
        <thead className="table-secondary text-muted text-uppercase small">
          <tr>
            <th style={{ width: '90px' }}>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Ngày bắt đầu</th>
            <th>Loại gói</th>
            <th>Trạng thái</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <Spinner animation="border" size="sm" className="me-2" />
                Đang tải danh sách...
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                Không có bài đăng nào phù hợp.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <img
                    src={post.thumbnail || '/default-thumbnail.jpg'}
                    alt="thumb"
                    className="img-thumbnail border-0 shadow-sm"
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <div className="fw-bold">{post.title}</div>
                  <div className="text-muted small">{post.location}</div>
                </td>
                <td className="text-danger fw-bold fs-6">{formatCurrency(post.amount)}</td>
                <td className="text-nowrap">{formatDate(post.startDate)}</td>
                <td>{renderPackageType(post.packageType)}</td>
                <td>{renderStatus(post.status)}</td>
                <td className="text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="light" size="sm" className="border-0">
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => onView?.(post)}>👁️ Xem chi tiết</Dropdown.Item>
                      <Dropdown.Item onClick={() => onEdit?.(post)}>✏️ Chỉnh sửa</Dropdown.Item>
                      {post.status === 'active' && (
                        <Dropdown.Item onClick={() => onHide?.(post)}>🚫 Ẩn bài</Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger" onClick={() => onDelete?.(post)}>
                        🗑️ Xoá bài
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PostTable;

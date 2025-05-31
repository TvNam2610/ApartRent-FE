import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import apiRequest from '../../lib/apiRequest';
import './savePost.scss';

function SavedPost() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [savedProperties, setSavedProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    const today = new Date().toLocaleDateString('vi-VN');

    //Hàm để gọi API lấy danh sách bài viết đã lưu với phân trang
    useEffect(() => {
        const fetchSavedProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiRequest(`/posts/favorites/${user.id}`);
                console.log(response.data);
                if (response.data && Array.isArray(response.data)) {
                    setSavedProperties(response.data);
                    setTotalCount(response.data.length);
                } else {
                    setSavedProperties([]);
                }
            } catch (err) {
                console.error('Failed to load saved properties:', err);
                setError('Không thể tải dữ liệu');
                setSavedProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedProperties();
    }, []);

    return (
        <div className="saved-property-list-page">
            <div className="saved-property-list-container">
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {/* Phần thông báo số lượng tin đăng và ngày cập nhật */}
                        <div className="property-header">
                            <h2>
                                Có {totalCount.toLocaleString('vi-VN')} tin đăng đã lưu dành cho bạn được cập nhật mới
                                nhất {today}
                            </h2>
                        </div>
                        <div className="saved-property-list">
                            {savedProperties.length > 0 ? (
                                savedProperties.map((property) => (
                                    <Card key={property.id} property={property} className="property-card" />
                                ))
                            ) : (
                                <p>Bạn chưa lưu bài viết nào!!!</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SavedPost;

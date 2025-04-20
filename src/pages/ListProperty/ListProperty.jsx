import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import FilterBar from '../../components/Filter/FilterBar';
import Card from '../../components/Card/Card';

import './ListProperty.scss';
import apiRequest from '../../lib/apiRequest';

function PropertyList() {
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        realEstateStatus: '',
        priceRange: '',
        areaRange: '',
        searchQuery: '',
        bedrooms: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;

    const today = new Date().toLocaleDateString('vi-VN');

    // Hàm để gọi API với các bộ lọc và phân trang
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiRequest('/posts?postStatus=APPROVED', {
                    params: { ...filters, page: currentPage + 1, limit: itemsPerPage },
                });

                if (response.data && Array.isArray(response.data.posts)) {
                    setFilteredData(response.data.posts);
                    console.log(response.data.posts);

                    setTotalPages(response.data.totalPages);
                    setTotalCount(response.data.totalCount);
                } else {
                    setFilteredData([]);
                }
            } catch (err) {
                console.error('Failed to load properties:', err);
                setError('Không thể tải dữ liệu');
                setFilteredData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filters, currentPage]);

    // Hàm xử lý khi có thay đổi trong FilterBar
    const handleFilterChange = (updatedFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...updatedFilters,
        }));
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
    };

    // Hàm chuyển trang khi sử dụng react-paginate
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="property-list-page">
            <FilterBar onFilterChange={handleFilterChange} />

            <div className="property-list-container">
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {/* Phần thông báo số lượng tin đăng và ngày cập nhật */}
                        <div className="property-header">
                            <h2>
                                Có {totalCount.toLocaleString('vi-VN')} tin đăng dành cho bạn được cập nhật mới nhất{' '}
                                {today}
                            </h2>
                        </div>

                        <div className="property-list">
                            {filteredData.length > 0 ? (
                                filteredData.map((property) => (
                                    <Card key={property.id} property={property} className="property-card" />
                                ))
                            ) : (
                                <p>Không có bất động sản nào phù hợp</p>
                            )}
                        </div>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            forcePage={currentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default PropertyList;

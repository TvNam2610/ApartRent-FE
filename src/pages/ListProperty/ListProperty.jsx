import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import FilterBar from '../../components/Filter/FilterBar';
import Card from '../../components/Card/Card';
import apiRequest from '../../lib/apiRequest';
import './ListProperty.scss';



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
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiRequest('/posts?postStatus=APPROVED', {
          params: { ...filters, page: currentPage + 1, limit: itemsPerPage },
        });
        console.log(response.data.posts)
        if (response.data && Array.isArray(response.data.posts)) {
          setFilteredData(response.data.posts);
          setTotalPages(Math.ceil(response.data.pagination.totalItems / itemsPerPage));
          setTotalCount(response.data.pagination.totalItems );
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

  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
    setCurrentPage(0); // Reset page when filters change
  };

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
            <div className="property-header">
              <h2>
                Có {totalCount.toLocaleString('vi-VN')} tin đăng dành cho bạn được cập nhật mới nhất
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
            />
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyList;

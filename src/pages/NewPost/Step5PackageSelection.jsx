/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './NewPost.scss';
import apiRequest from '../../lib/apiRequest';

const Step5PackageSelection = ({ formData, setFormData, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
  const [timeSlot, setTimeSlot] = useState('now');
  const [discount, setDiscount] = useState(0);
  const [days, setDays] = useState(7);
  const [packages, setPackages] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // Lấy dữ liệu từ server khi đổi tab
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await apiRequest.get(`/package/getByType?type=${activeTab}`);
        setPackages(res.data);
        if (res.data.length > 0) setSelectedPackage(res.data[0]);
      } catch (err) {
        console.error('Lỗi khi tải gói tin:', err);
      }
    };
    fetchPackages();
    setDiscount(0);
    setDays(7);
  }, [activeTab]);

  // Kiểm tra điều kiện hợp lệ
  useEffect(() => {
    if (!selectedPackage) return setIsValid(false);
    if (activeTab === 'daily') setIsValid(days > 0 && startDate && timeSlot);
    else if (activeTab === 'click') setIsValid(formData.clicks > 0 && startDate);
    else if (activeTab === 'guest') setIsValid(formData.guests > 0 && startDate);
  }, [selectedPackage, days, timeSlot, startDate, formData, activeTab]);

  // Tổng tiền
  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const price = selectedPackage.price;
    if (activeTab === 'daily') return Math.floor(price * days * (1 - discount));
    if (activeTab === 'click') return Math.floor(price * (formData.clicks || 50) * (1 - discount));
    if (activeTab === 'guest') return Math.floor(price * (formData.guests || 10) * (1 - discount));
    return 0;
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      packageId: selectedPackage?.id,
      packageType: activeTab,
      startDate,
      days,
      amount: calculateTotal(),
    });
    onNext();
  };

  return (
    <>
      <div className="form-card">
        {/* Tabs */}
        <div className="tab-wrapper">
          {['daily', 'click', 'guest'].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'daily' && 'Trả theo ngày'}
              {tab === 'click' && 'Trả theo click'}
              {tab === 'guest' && 'Trả theo khách'}
            </button>
          ))}
        </div>

        {/* Gói tin */}
        <div className="package-options">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="pkg-title">
                {pkg.name === 'premium'
                  ? 'VIP Kim Cương'
                  : pkg.name === 'gold'
                  ? 'VIP Vàng'
                  : pkg.name === 'silver'
                  ? 'VIP Bạc'
                  : 'Tin thường'}
              </div>
              <div className="pkg-price">
                {pkg.price.toLocaleString()} đ/{activeTab === 'daily' ? 'ngày' : activeTab === 'click' ? 'click' : 'khách'}
              </div>
            </div>
          ))}
        </div>

        {/* === Nội dung theo tab === */}
        {activeTab === 'daily' && (
          <>
            <div className="duration-section">
              <label>Đăng trong bao nhiêu ngày?</label>
              <div className="duration-options">
                {[7, 10, 15].map((d) => (
                  <div
                    key={d}
                    className={`duration-card ${days === d ? 'active' : ''}`}
                    onClick={() => setDays(d)}
                  >
                    {d} ngày <br />
                    {(selectedPackage?.price * d).toLocaleString()} đ
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'click' && (
          <div className="mb-3">
            <label>Số lượt click</label>
            <select
              className="form-select"
              value={formData.clicks || 50}
              onChange={(e) => setFormData({ ...formData, clicks: parseInt(e.target.value) })}
            >
              <option value={50}>50 click</option>
              <option value={100}>100 click</option>
              <option value={200}>200 click</option>
            </select>
          </div>
        )}

        {activeTab === 'guest' && (
          <div className="mb-3">
            <label>Số khách tiềm năng</label>
            <select
              className="form-select"
              value={formData.guests || 10}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            >
              <option value={10}>10 khách</option>
              <option value={20}>20 khách</option>
              <option value={50}>50 khách</option>
            </select>
          </div>
        )}

        {/* Ngày bắt đầu & giờ đăng */}
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="form-label">Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Hẹn giờ đăng tin</label>
            <select
              className="form-select form-select-lg"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="now">Đăng ngay</option>
              <option value="8am">8h sáng</option>
              <option value="12pm">12h trưa</option>
              <option value="8pm">20h tối</option>
            </select>
          </div>
        </div>

        {/* Khuyến mãi */}
        <div className="mb-3">
          <label>Khuyến mãi</label>
          <select
            className="form-select"
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
          >
            <option value={0}>Không áp dụng</option>
            <option value={0.05}>Giảm 5%</option>
            <option value={0.1}>Giảm 10%</option>
          </select>
        </div>

        {/* Tổng tiền */}
        <div className="d-flex justify-content-between align-items-center total-section">
          <div>
            <strong>Tổng tiền:</strong>{' '}
            <span className="text-danger fs-5">{calculateTotal().toLocaleString()} đ</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bottom-nav">
        <button className="prev-btn btn-outline" onClick={onPrev}>
          Quay lại
        </button>
        <button
          className={`next-btn ${isValid ? 'active' : ''}`}
          onClick={handleNext}
          disabled={!isValid}
        >
          TIẾP TỤC
        </button>
      </div>
    </>
  );
};

export default Step5PackageSelection;

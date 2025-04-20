/* eslint-disable react/prop-types */
import { useState } from 'react';

import location from '../../assets/img/pin.png';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import size from '../../assets/img/size.png';
import floor from '../../assets/img/floor.png';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Card.scss';
import { Link } from 'react-router-dom';
import { formatCurrencyVN } from '../../lib/formatCurrency';
import apiRequest from '../../lib/apiRequest';
import { fToNow } from '../../lib/formatTime';
const PropertyCard = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    // Hàm xử lý lưu hoặc xóa bài viết khỏi danh sách yêu thích
    const handleSavePost = async () => {
        try {
            const response = await apiRequest('/posts/save-post', {
                method: 'POST',
                data: {
                    postId: property.id,
                },
            });
            setIsSaved(!isSaved);

            toast.success(response.data.message);
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };
    // Chuyển dữ liệu về realEstate
    const realEstate = property.realEstate;

    const handleNextImage = () => {
        if (realEstate && realEstate.images && realEstate.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex === realEstate.images.length - 1 ? 0 : prevIndex + 1));
        }
    };

    const handlePreviousImage = () => {
        if (realEstate && realEstate.images && realEstate.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? realEstate.images.length - 1 : prevIndex - 1));
        }
    };

    if (!realEstate) {
        return <div>No real estate data available</div>;
    }

    return (
        <div className="property-card">
            <div className="property-card__image">
                <Link to={`/posts/${property.id}`}>
                    {realEstate.images && realEstate.images.length > 0 ? (
                        <img src={realEstate.images[currentImageIndex]} alt={property.title} />
                    ) : (
                        <p>No images available</p>
                    )}
                </Link>

                {realEstate.images && realEstate.images.length > 0 && (
                    <>
                        <button className="property-card__prev" onClick={handlePreviousImage}>
                            &lt;
                        </button>
                        <button className="property-card__next" onClick={handleNextImage}>
                            &gt;
                        </button>
                    </>
                )}
            </div>
            <div className="property-card__details">
                {realEstate.status === 'FOR_SALE' && <div className="property-card__badge sale">SALE</div>}
                {realEstate.status === 'FOR_RENT' && <div className="property-card__badge rent">RENT</div>}
                <span className="date">{fToNow(property.createAt)} ago</span>

                <div className="property-card__title">
                    <Link style={{ textDecoration: 'none', color: '#555' }} to={`/posts/${property.id}`}>
                        {property.title}
                    </Link>
                </div>
                <p className="property-card__location">
                    <img src={location} alt="Location icon" />
                    <span>{realEstate.location || 'Location not available'}</span>
                </p>
                <div className="property-card__info">
                    <span>
                        <img src={bed} alt="Bedroom icon" />
                        {realEstate.bedrooms || 'N/A'}
                    </span>
                    <span>
                        <img src={bath} alt="Bathroom icon" />
                        {realEstate.bathrooms || 'N/A'}
                    </span>
                    <span>
                        <img src={size} alt="Size icon" />
                        {realEstate.area ? `${realEstate.area} m²` : 'N/A'}
                    </span>
                    <span>
                        <img className="floor" src={floor} alt="Floor icon" />
                        {realEstate.floor ? `Tầng ${realEstate.floor}` : 'N/A'}
                    </span>
                </div>

                <div className="property-card__footer">
                    <span className="price">
                        {realEstate.price ? formatCurrencyVN(realEstate.price) : 'N/A'}
                        {realEstate.status === 'FOR_RENT' ? '/ tháng' : ''}
                    </span>
                    <span className="icons">
                        <button className="icon" onClick={handleSavePost}>
                            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

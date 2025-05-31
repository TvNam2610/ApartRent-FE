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
import { slugify } from '../../utils/seoUtils';


const PropertyCard = ({ property }) => {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user')).id;

    // useEffect(() => {
    //     const checkFavoriteStatus = async () => {
    //       try {
    //         const response = await apiRequest(`/posts/is-favorite?userId=${userId}&postId=${property.id}`);
    //         setIsSaved(response.data.isFavorite);
    //       } catch (error) {
    //         console.error('Error checking favorite status:', error);
    //       }
    //     };
      
    //     if (userId) checkFavoriteStatus();
    //   }, [property.id, userId]);
      

    // Hàm xử lý lưu hoặc xóa bài viết khỏi danh sách yêu thích
    const handleSavePost = async () => {
        try {
            const response = await apiRequest('/posts/save-post', {
                method: 'POST',
                data: {
                    postId: property.id,
                    userId: userId,
                },
            });
            setIsSaved(!isSaved);

            toast.success(response.data.message);
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
        
    };

    return (
        <div className="property-card">
            <div className="property-card__image">
                <Link to={`/posts/${slugify(property.title)}-id${property.id}`}>
                    {property.thumbnail ? (
                        <img src={property.thumbnail} alt={property.title} />
                    ) : (
                        <p>No images available</p>
                    )}
                </Link>
            </div>  
            <div className="property-card__details">
                {property.realEstateStatus === 'FOR_SALE' && <div className="property-card__badge sale">SALE</div>}
                {property.realEstateStatus === 'FOR_RENT' && <div className="property-card__badge rent">RENT</div>}
                <span className="date">{fToNow(property.startDate)} ago</span>

                <div className="property-card__title">
                    <Link style={{ textDecoration: 'none', color: '#555' }} to={`/posts/${property.id}`}>
                        {property.title}
                    </Link>
                </div>
                <p className="property-card__location">
                    <img src={location} alt="Location icon" />
                    <span>{property.location || 'Location not available'}</span>
                </p>
                <div className="property-card__info">
                    <span>
                        <img src={bed} alt="Bedroom icon" />
                        {property.bedrooms || 'N/A'}
                    </span>
                    <span>
                        <img src={bath} alt="Bathroom icon" />
                        {property.bathrooms || 'N/A'}
                    </span>
                    <span>
                        <img src={size} alt="Size icon" />
                        {property.area ? `${property.area} m²` : 'N/A'}
                    </span>
                    <span>
                        <img className="floor" src={floor} alt="Floor icon" />
                        {property.floor ? `Tầng ${property.floor}` : 'N/A'}
                    </span>
                </div>

                <div className="property-card__footer">
                    <span className="price">
                        {property.realEstatePrice ? formatCurrencyVN(property.realEstatePrice) : 'N/A'}
                        {property.realEstateStatus === 'FOR_RENT' ? '/ tháng' : ''}
                    </span>
                    <span className="icons">
                        <button
                            className={`btn btn-sm ${isSaved ? 'btn-warning' : 'btn-outline-secondary'} rounded-circle`}
                            title={isSaved ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
                            onClick={handleSavePost}
                            style={{ fontSize: '1.2rem', padding: '6px 10px' }}
                        >
                            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

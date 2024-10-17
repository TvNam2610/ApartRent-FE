/* eslint-disable react/prop-types */
import { useState } from 'react';

import location from '../../assets/img/pin.png';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import size from '../../assets/img/size.png';
import floor from '../../assets/img/floor.png';
import save from '../../assets/img/save.png';
import chat from '../../assets/img/chat.png';

import './Card.scss';
import { Link } from 'react-router-dom';
import { formatCurrencyVN } from '../../lib/formatCurrency';

const PropertyCard = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Chuyển dữ liệu về realEstate
    const realEstate = property.realEstate;
    console.log(realEstate);

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
                <div className="property-card__features">
                    {realEstate.features && realEstate.features.length > 0 ? (
                        realEstate.features.slice(0, 5).map((feature, index) => (
                            <span key={index} className="property-card__feature">
                                {feature}
                            </span>
                        ))
                    ) : (
                        <span className="property-card__feature">No features available</span>
                    )}
                    {realEstate.features && realEstate.features.length > 5 && (
                        <span className="property-card__feature">+{realEstate.features.length - 5}</span>
                    )}
                </div>
                <div className="property-card__footer">
                    <span className="price">
                        {realEstate.price ? formatCurrencyVN(realEstate.price) : 'N/A'}
                        {realEstate.status === 'FOR_RENT' ? '/ tháng' : ''}
                    </span>
                    <span className="icons">
                        <div className="icon">
                            <img src={save} alt="Save icon" />
                        </div>
                        <div className="icon">
                            <img src={chat} alt="Chat icon" />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

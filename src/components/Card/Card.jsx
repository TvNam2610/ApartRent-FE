/* eslint-disable react/prop-types */
import { useState } from 'react';
import './PropertyCard.scss';

const PropertyCard = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="property-card">
            <div className="property-card__image">
                <img src={property.images[currentImageIndex]} alt={property.title} />
                <div className="property-card__badge">{property.isNew ? 'Mới' : ''}</div>
                {/* Nút điều hướng qua các ảnh */}
                <button className="property-card__prev" onClick={handlePreviousImage}>
                    &lt;
                </button>
                <button className="property-card__next" onClick={handleNextImage}>
                    &gt;
                </button>
            </div>
            <div className="property-card__details">
                <h2 className="property-card__title">{property.title}</h2>
                <p className="property-card__location">{property.location}</p>
                <div className="property-card__info">
                    <span>{property.bedrooms} phòng ngủ</span>
                    <span>{property.bathrooms} phòng tắm</span>
                    <span>{property.area} m²</span>
                </div>
                <div className="property-card__features">
                    {property.features.slice(0, 5).map((feature, index) => (
                        <span key={index} className="property-card__feature">
                            {feature}
                        </span>
                    ))}
                    {property.features.length > 5 && (
                        <span className="property-card__feature">+{property.features.length - 5}</span>
                    )}
                </div>
                <div className="property-card__footer">
                    <span className="property-card__price">
                        {property.price} {property.priceType === 'rent' ? '/ tháng' : ''}
                    </span>
                    <button className="property-card__action">Call</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

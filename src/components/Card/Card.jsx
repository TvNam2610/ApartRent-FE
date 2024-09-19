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
                {/* <div className="property-card__badge">{property.isNew ? 'Mới' : ''}</div> */}

                <button className="property-card__prev" onClick={handlePreviousImage}>
                    &lt;
                </button>
                <button className="property-card__next" onClick={handleNextImage}>
                    &gt;
                </button>
            </div>
            <div className="property-card__details">
                <div className="property-card__title">{property.title}</div>
                <p className="property-card__location">
                    <img src={location}></img>
                    <span>{property.location}</span>
                </p>
                <div className="property-card__info">
                    <span>
                        <img src={bed}></img>
                        {property.bedrooms}
                    </span>
                    <span>
                        <img src={bath}></img>
                        {property.bathrooms}
                    </span>
                    <span>
                        <img src={size}></img>
                        {property.area} m²
                    </span>
                    <span>
                        <img className="floor" src={floor}></img>
                        Tầng {property.floor}
                    </span>
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
                    <span className="price">
                        {property.price} {property.priceType === 'rent' ? '/ tháng' : ''}
                    </span>
                    <span className="icons">
                        <div className="icon">
                            <img src={save} alt="" />
                        </div>
                        <div className="icon">
                            <img src={chat} alt="" />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

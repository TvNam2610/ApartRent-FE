/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './Map.scss';
import 'leaflet/dist/leaflet.css';

function Map({ properties }) {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const promises = properties.map(async (property) => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                            property.location,
                        )}`,
                    );
                    const data = await response.json();
                    if (data && data.length > 0) {
                        return {
                            id: property.id,
                            title: property.title,
                            price: property.price,
                            location: property.location,
                            lat: data[0].lat,
                            lon: data[0].lon,
                        };
                    }
                } catch (error) {
                    console.error(`Error fetching coordinates for ${property.location}:`, error);
                }
                return null;
            });

            const results = await Promise.all(promises);
            setCoordinates(results.filter(Boolean)); // Filter out any null results
        };

        fetchCoordinates();
    }, [properties]);

    return (
        <MapContainer center={[10.762622, 106.660172]} zoom={12} scrollWheelZoom={false} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((property) => (
                <Marker key={property.id} position={[property.lat, property.lon]}>
                    <Popup>
                        <strong>{property.title}</strong>
                        <br />
                        {property.location}
                        <br />
                        Giá: {property.price}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;

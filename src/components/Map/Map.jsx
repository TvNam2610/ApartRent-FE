/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './Map.scss';
import 'leaflet/dist/leaflet.css'

function Map({ properties }) {
  return (
    <MapContainer center={[10.762622, 106.660172]} zoom={12} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[10.762622, 106.660172]} // Tọa độ tạm thời, bạn có thể cập nhật với tọa độ thực của property
        >
          <Popup>
            <strong>{property.title}</strong><br />
            {property.location}<br />
            Giá: {property.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

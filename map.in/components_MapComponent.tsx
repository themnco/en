import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';

import { Location } from '../types';

const UserLocationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTIuOTcxIDguMTY4YTEuNzUgMS43NSAwIDEgMC0yLjQ3NC0yLjQ3NGwtMS4zMTMgMS4zMTMtMS4xNDgtMS4xNDhhLjc1Ljc1IDAgMCAxIDEuMDYtMS4wNmwxLjEzIDEuMTMgMy4zNTMtMy4zNTNhLjc1Ljc1IDAgMSAxIDEuMDYgMS4wNkwxMi45NyA4LjE2OFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyMS43NWE5Ljc1IDkuNzUgMCAxIDAgMC0xOS41IDkuNzUgOS43NSAwIDAgMCAwIDE5LjVabTAtMS41YTguMjUgOC4yNSAwIDEgMC0xNi41IDguMjUgOC4yNSAwIDAgMCAwIDE2LjVaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPgo=',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  className: 'text-blue-500'
});

interface ChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface MapComponentProps {
  center: Location;
}

const MapComponent: React.FC<MapComponentProps> = ({ center }) => {
  const position: LatLngExpression = [center.latitude, center.longitude];
  
  return (
    <div className="h-full w-full">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <ChangeView center={position} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={UserLocationIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

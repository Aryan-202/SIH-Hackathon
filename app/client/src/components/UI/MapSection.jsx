// src/components/UI/MapSection.jsx
import React, { useEffect, useRef } from 'react';

const MapSection = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps script not loaded");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'You are here',
    });
  }, [latitude, longitude]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '400px' }} 
      className="rounded-lg overflow-hidden"
    />
  );
};

export default MapSection;

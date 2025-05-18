'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useRef, useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icons
if (typeof window !== 'undefined') {
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}

export default function ZolaMap() {
  const defaultPosition: L.LatLngTuple = [40.672828, -74.015271];
  const [clicked, setClicked] = useState<L.LatLng | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setClicked(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(defaultPosition, 18);
    }

    return () => {
      // Explicitly remove map instance on unmount to prevent leftover state
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center max-w-2xl p-2">
      <div className="w-full rounded-2xl border-gray-300 overflow-hidden">
        <div className="h-[500px] w-full">
          <MapContainer
            key="zola-map" // force fresh map if remounted
            center={defaultPosition}
            zoom={18}
            scrollWheelZoom
            className="h-full w-full"
            whenReady={() => {
              // The map instance is available via the ref after mount
              // If needed, you can access it via mapRef.current here
            }}
          >
            {/* ZOLA base map */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Tiles &copy; Esri — ZOLA Style"
            />

            {/* Zoning Overlay */}
            <TileLayer
              url="https://a816-dcpgis.nyc.gov/arcgis/rest/services/Zoning/Zoning_Districts/MapServer/tile/{z}/{y}/{x}"
              opacity={0.7}
            />

            <ClickHandler />

            <Marker position={defaultPosition}>
              <Popup>
                <strong>Default Location</strong>
                <br />
                Lat: {defaultPosition[0]}
                <br />
                Lng: {defaultPosition[1]}
              </Popup>
            </Marker>

            {clicked && (
              <Marker position={clicked}>
                <Popup>
                  <strong>Clicked Location</strong>
                  <br />
                  Lat: {clicked.lat.toFixed(6)}
                  <br />
                  Lng: {clicked.lng.toFixed(6)}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

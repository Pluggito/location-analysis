import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Example arrays you provided
type Location = {
  name: string;
  coords: [number, number];
  type: string;
  accessType?: string;
  highway?: string;
};



const ports: Location[] = [
  { name: "Red Hook Container Terminal", coords: [40.6793, -74.016], type: "Port" },
  // ... other ports
];
const airports: Location[] = [
  { name: "Newark International Airport", coords: [40.6895, -74.1745], type: "Airport" },
  // ... other airports
];
const keyLocations: Location[] = [
  { name: "Downtown Brooklyn", coords: [40.696019, -73.984518], type: "Key Location" },
  // ... other key locations
];

// A simple icon factory for different location types
const iconFactory = (color: string) =>
  new L.Icon({
     iconUrl: "/highway.png",
    iconSize: [10, 10],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const icons: { [key: string]: L.Icon } = {
  Port: iconFactory("0044FF"),
  Airport: iconFactory("FF4400"),
  "Key Location": iconFactory("22CC22"),
  "Highway Access Point": iconFactory("AAAA00"),
};

export default function MapWithHighwayAccess() {
  const [highwayAccessPoints, setHighwayAccessPoints] = useState<Location[]>([]);

// Define a type for GeoJSON Feature
type GeoJSONFeature = {
  type: "Feature";
  properties: {
    name?: string;
    accessType?: string;
    highway?: string;
    [key: string]: string | number | boolean | undefined;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

useEffect(() => {
  fetch("/highway_junctions.geojson")
    .then((res) => res.json())
    .then((geojson) => {
      const points: Location[] = geojson.features.map((feature: GeoJSONFeature) => ({
        name: feature.properties.name || "Unknown",
        coords: [
          feature.geometry.coordinates[1], // lat
          feature.geometry.coordinates[0], // lng
        ],
        type: "Highway Access Point",
        accessType: feature.properties.accessType || "Unknown",
        highway: feature.properties.highway || "Unknown",
      }));
      setHighwayAccessPoints(points);
    });
}, []);



  const allLocations = [...ports, ...airports, ...keyLocations, ...highwayAccessPoints];

  return (
    <MapContainer center={[40.7, -74]} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {allLocations.map(({ name, coords, type, accessType, highway }, idx) => (
        <Marker key={idx} position={coords} icon={icons[type]}>
          <Popup>
            <strong>{name}</strong>
            <br />
            Type: {type}
            {type === "Highway Access Point" && (
              <>
                <br />
                Access: {accessType}
                <br />
                Highway: {highway}
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

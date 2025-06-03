"use client";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Circle,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const createDefaultIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const createOriginIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [1, -44],
    shadowSize: [51, 51],
    className: "origin-marker",
  });
};

const portIcon = new L.Icon({
  iconUrl: "/port.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const airportIcon = new L.Icon({
  iconUrl: "/airport.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const highwayIcon = new L.Icon({
  iconUrl: "/highway.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapClickHandler({
  onLocationClick,
}: {
  onLocationClick: (latlng: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationClick(e.latlng);
    },
  });
  return null;
}

function MapLegend() {
  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar bg-white p-3 rounded-md shadow-md m-4">
        <h4 className="font-bold mb-2 text-sm">Travel Time Zones</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 opacity-40"></div>
            <span className="text-xs">0-15 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-40"></div>
            <span className="text-xs">16-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-40"></div>
            <span className="text-xs">30+ minutes</span>
          </div>
        </div>
        {/*<h4 className="font-bold mb-2 mt-4 text-sm">Zoning Types</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-700 opacity-60"></div>
            <span className="text-xs">Industrial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-700 opacity-60"></div>
            <span className="text-xs">Commercial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-700 opacity-60"></div>
            <span className="text-xs">Residential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-700 opacity-60"></div>
            <span className="text-xs">Mixed Use</span>
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default function ZoningPPage() {
  const initialOrigin: L.LatLngTuple = [40.672828, -74.015271];
  const [origin, setOrigin] = useState<L.LatLngTuple>(initialOrigin);
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null);
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null);
  const [originIcon, setOriginIcon] = useState<L.Icon | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [portTravelData, setPortTravelData] = useState<RouteData[]>([]);
  const [airportTravelData, setAirportTravelData] = useState<RouteData[]>([]);
  const [highwayTravelData, setHighwayTravelData] = useState<RouteData[]>([]);
  const [activeTab, setActiveTab] = useState("travel-times");
  const [showZoningOverlay, setShowZoningOverlay] = useState(true);
  const [showTravelTimeZones, setShowTravelTimeZones] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<{
    type: "port" | "airport" | "highway";
    index: number;
  } | null>(null);
  const [routePolylines, setRoutePolylines] = useState<{
    ports: L.LatLngTuple[][];
    airports: L.LatLngTuple[][];
    highways: L.LatLngTuple[][];
  }>({
    ports: [],
    airports: [],
    highways: [],
  });

  const ports = [
    {
      name: "Red Hook Container Terminal",
      coords: [40.6793, -74.016],
      type: "Port",
    },
    {
      name: "Port Newark Container Terminal",
      coords: [40.684, -74.1513],
      type: "Port",
    },
    { name: "APM Terminal", coords: [40.6735, -74.1449], type: "Port" },
    { name: "GCT Bayonne Terminal", coords: [40.667, -74.086], type: "Port" },
    {
      name: "GCT New York Terminal",
      coords: [40.6375182, -74.3377233],
      type: "Port",
    },
    { name: "Maher Terminal", coords: [40.6848, -74.1435], type: "Port" },
  ];

  const airports = [
    {
      name: "Newark International Airport",
      coords: [40.6895, -74.1745],
      type: "Airport",
    },
    { name: "LaGuardia Airport", coords: [40.7769, -73.874], type: "Airport" },
    { name: "JFK Airport", coords: [40.6413, -73.7781], type: "Airport" },
  ];

  const highways = [
    { name: "Route 9", coords: [40.7, -74.15], type: "Highway" },
    { name: "Route 440", coords: [40.6, -74.2], type: "Highway" },
    { name: "Route 78", coords: [40.7, -74.3], type: "Highway" },
    { name: "Route 278", coords: [40.7, -74.0], type: "Highway" },
    { name: "Route 95", coords: [40.8, -74.1], type: "Highway" },
  ];

  useEffect(() => {
    try {
      setDefaultIcon(createDefaultIcon());
      setOriginIcon(createOriginIcon());
    } catch (error) {
      console.error("Error creating map icons:", error);
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);

  type RouteData = {
    duration: number; // in seconds
    distance: number; // in meters
    polyline: string; // encoded polyline
  };

  const fetchTravelTime = async (
    originCoords: L.LatLngTuple,
    destination: [number, number]
  ): Promise<RouteData> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      if (!baseUrl) {
        console.warn("API base URL not set, returning mock data");
        return {
          duration: 0,
          distance: 0,
          polyline: "",
        };
      }

      const response = await axios.post(`${baseUrl}/source/route`, {
        start: destination,
        end: originCoords,
      });

      const data = response.data;

      // Add validation for the response data
      if (!data) {
        throw new Error("No data received from API");
      }

      // console.log("API Response:", data) // Debug log to see actual response structure

      // Handle different possible response structures
      const duration = data.travelTime || data.duration || data.time || 0;
      const distance = data.distance || 0;
      const polyline = data.polyline || data.route || "";

      return {
        duration: typeof duration === "number" ? duration : 0,
        distance: typeof distance === "number" ? distance : 0,
        polyline: polyline,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      return {
        duration: -1,
        distance: -1,
        polyline: "",
      };
    }
  };

  // Delay helper (ms)
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Throttled fetch travel times
  const throttledFetchTravelTimes = async (
    originCoords: L.LatLngTuple,
    locations: { coords: [number, number] }[],
    delayMs = 300
  ): Promise<RouteData[]> => {
    const results: RouteData[] = [];

    for (const loc of locations) {
      const routeData = await fetchTravelTime(originCoords, loc.coords);
      results.push(routeData);
      await delay(delayMs);
    }

    return results;
  };

  const calculateAllTravelTimes = async (originCoords: L.LatLngTuple) => {
    setIsCalculating(true);
    try {
      setPortTravelData([]);
      setAirportTravelData([]);
      setHighwayTravelData([]);
      setRoutePolylines({ ports: [], airports: [], highways: [] });

      const portRoutes = await throttledFetchTravelTimes(
        originCoords,
        ports.map((p) => ({ coords: p.coords as [number, number] }))
      );
      setPortTravelData(portRoutes);

      // Extract polylines for ports
      const portPolylines = portRoutes
        .map((route) => (Array.isArray(route.polyline) ? route.polyline : []))
        .filter((polyline) => polyline.length > 0);

      const airportRoutes = await throttledFetchTravelTimes(
        originCoords,
        airports.map((a) => ({ coords: a.coords as [number, number] }))
      );
      setAirportTravelData(airportRoutes);

      // Extract polylines for airports
      const airportPolylines = airportRoutes
        .map((route) => (Array.isArray(route.polyline) ? route.polyline : []))
        .filter((polyline) => polyline.length > 0);

      const highwayRoutes = await throttledFetchTravelTimes(
        originCoords,
        highways.map((h) => ({ coords: h.coords as [number, number] }))
      );
      setHighwayTravelData(highwayRoutes);

      // Extract polylines for highways
      const highwayPolylines = highwayRoutes
        .map((route) => (Array.isArray(route.polyline) ? route.polyline : []))
        .filter((polyline) => polyline.length > 0);

      setRoutePolylines({
        ports: portPolylines,
        airports: airportPolylines,
        highways: highwayPolylines,
      });
    } catch (error) {
      console.error("Error calculating travel times:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (origin) {
      calculateAllTravelTimes(origin);
    }
  }, [origin]);

  const handleLocationClick = (latlng: L.LatLng) => {
    setClickedLocation(latlng);
  };

  const setNewOrigin = (newOrigin: L.LatLngTuple) => {
    setOrigin(newOrigin);
    calculateAllTravelTimes(newOrigin);
  };

  const handleSetOriginFromClick = () => {
    if (clickedLocation) {
      const newOrigin: L.LatLngTuple = [
        clickedLocation.lat,
        clickedLocation.lng,
      ];
      setNewOrigin(newOrigin);
      setClickedLocation(null);
    }
  };

  const handleMapCreated = (map: L.Map) => {
    mapRef.current = map;
  };

  const handleDirectionsClick = (
    type: "port" | "airport" | "highway",
    index: number
  ) => {
    if (selectedRoute?.type === type && selectedRoute?.index === index) {
      // If the same route is selected, hide it
      setSelectedRoute(null);
    } else {
      // Show the selected route
      setSelectedRoute({ type, index });
    }
  };

  if (!defaultIcon || !originIcon) {
    return (
      <div className="h-[450px] w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading map resources...</p>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] w-full rounded-lg overflow-hidden">
            <MapContainer
              center={origin}
              zoom={11}
              scrollWheelZoom={true}
              className="h-full w-full"
              ref={mapRef}
              whenReady={() => {
                if (mapRef.current) {
                  handleMapCreated(mapRef.current);
                }
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* NYC Zoning Districts Layer */}
              {showZoningOverlay && (
                <TileLayer
                  url="https://a816-dcpgis.nyc.gov/arcgis/rest/services/Zoning/Zoning_Districts/MapServer/tile/{z}/{y}/{x}"
                  opacity={0.7}
                  attribution="NYC Department of City Planning"
                />
              )}

              <MapClickHandler onLocationClick={handleLocationClick} />

              {/* Travel Time Zones */}
              {showTravelTimeZones && (
                <>
                  {/* 0-15 minute zone (green) */}
                  <Circle
                    center={origin}
                    radius={1500}
                    pathOptions={{
                      fillColor: "#4ade80",
                      fillOpacity: 0.2,
                      color: "#4ade80",
                      weight: 1,
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>0-15 Minute Travel Zone</strong>
                        <br />
                        <span className="text-xs text-green-600">
                          Quick access area
                        </span>
                      </div>
                    </Popup>
                  </Circle>

                  {/* 16-30 minute zone (yellow) */}
                  <Circle
                    center={origin}
                    radius={3000}
                    pathOptions={{
                      fillColor: "#facc15",
                      fillOpacity: 0.2,
                      color: "#facc15",
                      weight: 1,
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>16-30 Minute Travel Zone</strong>
                        <br />
                        <span className="text-xs text-yellow-600">
                          Medium access area
                        </span>
                      </div>
                    </Popup>
                  </Circle>

                  {/* 30+ minute zone (red) */}
                  <Circle
                    center={origin}
                    radius={5000}
                    pathOptions={{
                      fillColor: "#ef4444",
                      fillOpacity: 0.2,
                      color: "#ef4444",
                      weight: 1,
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>30+ Minute Travel Zone</strong>
                        <br />
                        <span className="text-xs text-red-600">
                          Extended travel area
                        </span>
                      </div>
                    </Popup>
                  </Circle>
                </>
              )}

              {/* Origin marker */}
              <Marker position={origin as L.LatLngExpression} icon={originIcon}>
                <Popup>
                  <div className="text-center">
                    <strong>Origin Point</strong>
                    <br />
                    <span className="text-sm text-gray-600">
                      Lat: {origin[0].toFixed(6)}
                    </span>
                    <br />
                    <span className="text-sm text-gray-600">
                      Lng: {origin[1].toFixed(6)}
                    </span>
                    <br />
                    <span className="text-xs text-green-600 font-medium">
                      Travel times calculated from here
                    </span>
                  </div>
                </Popup>
              </Marker>

              {/* Ports */}
              {ports.map(({ name, coords, type }, idx) => (
                <Marker
                  key={`port-${idx}`}
                  position={coords as L.LatLngExpression}
                  icon={portIcon}
                >
                  <Popup>
                    <strong>{name}</strong>
                    <br />
                    <span>Type: {type}</span>
                    <br />
                    <span>
                      Travel Time:{" "}
                      {isCalculating
                        ? "Calculating..."
                        : portTravelData[idx]?.duration &&
                          portTravelData[idx].duration !== -1
                        ? portTravelData[idx].duration > 60
                          ? `${Math.round(
                              portTravelData[idx].duration / 60
                            )} mins`
                          : `${portTravelData[idx].duration} secs`
                        : "Not available"}
                    </span>
                    <br />
                    <span>
                      Distance:{" "}
                      {isCalculating
                        ? ""
                        : portTravelData[idx]?.distance &&
                          portTravelData[idx].distance > 0
                        ? `${(portTravelData[idx].distance / 1000).toFixed(
                            2
                          )} km`
                        : "Not available"}
                    </span>
                    <br />
                    <h4>Travel Mode: Car </h4>
                    <br />
                    <button
                      onClick={() => handleDirectionsClick("port", idx)}
                      className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                        selectedRoute?.type === "port" &&
                        selectedRoute?.index === idx
                          ? "bg-green-700"
                          : "bg-green-600"
                      }`}
                    >
                      {selectedRoute?.type === "port" &&
                      selectedRoute?.index === idx
                        ? "Hide Route"
                        : "Directions"}
                    </button>
                  </Popup>
                </Marker>
              ))}

              {/* Airports */}
              {airports.map(({ name, coords, type }, idx) => (
                <Marker
                  key={`airport-${idx}`}
                  position={coords as L.LatLngExpression}
                  icon={airportIcon}
                >
                  <Popup>
                    <strong>{name}</strong>
                    <br />
                    <span>Type: {type}</span>
                    <br />
                    <span>
                      Travel Time:{" "}
                      {isCalculating
                        ? "Calculating..."
                        : airportTravelData[idx]?.duration &&
                          airportTravelData[idx].duration !== -1
                        ? airportTravelData[idx].duration > 60
                          ? `${Math.round(
                              airportTravelData[idx].duration / 60
                            )} mins`
                          : `${airportTravelData[idx].duration} secs`
                        : "Not available"}
                    </span>
                    <br />
                    <span>
                      Distance:{" "}
                      {isCalculating
                        ? ""
                        : airportTravelData[idx]?.distance &&
                          airportTravelData[idx].distance > 0
                        ? `${(airportTravelData[idx].distance / 1000).toFixed(
                            2
                          )} km`
                        : "Not available"}
                    </span>
                    <br />
                    <h4>
                      Travel Mode: <b>Car</b>
                    </h4>
                    <br />
                    <button
                      onClick={() => handleDirectionsClick("airport", idx)}
                      className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                        selectedRoute?.type === "airport" &&
                        selectedRoute?.index === idx
                          ? "bg-green-700"
                          : "bg-green-600"
                      }`}
                    >
                      {selectedRoute?.type === "airport" &&
                      selectedRoute?.index === idx
                        ? "Hide Route"
                        : "Directions"}
                    </button>
                  </Popup>
                </Marker>
              ))}

              {/* Highways */}
              {highways.map(({ name, coords, type }, idx) => (
                <Marker
                  key={`highway-${idx}`}
                  position={coords as L.LatLngExpression}
                  icon={highwayIcon}
                >
                  <Popup>
                    <div className="text-center ">
                      <strong>Highway {name}</strong>
                      <br />
                      <span>Type: {type}</span>
                      <br />
                      <span>
                        Travel Time:{" "}
                        {isCalculating
                          ? "Calculating..."
                          : highwayTravelData[idx]?.duration &&
                            highwayTravelData[idx].duration !== -1
                          ? highwayTravelData[idx].duration > 60
                            ? `${Math.round(
                                highwayTravelData[idx].duration / 60
                              )} mins`
                            : `${highwayTravelData[idx].duration} secs`
                          : "Not available"}
                      </span>
                      <br />
                      <span>
                        Distance:{" "}
                        {isCalculating
                          ? ""
                          : highwayTravelData[idx]?.distance &&
                            highwayTravelData[idx].distance > 0
                          ? `${(highwayTravelData[idx].distance / 1000).toFixed(
                              2
                            )} km`
                          : "Not available"}
                      </span>
                      <br />
                      <h4>
                        Travel Mode: <b>Car</b>
                      </h4>
                      <br />
                      <button
                        onClick={() => handleDirectionsClick("highway", idx)}
                        className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                          selectedRoute?.type === "highway" &&
                          selectedRoute?.index === idx
                            ? "bg-green-700"
                            : "bg-green-600"
                        }`}
                      >
                        {selectedRoute?.type === "highway" &&
                        selectedRoute?.index === idx
                          ? "Hide Route"
                          : "Directions"}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Clicked location marker */}
              {clickedLocation && (
                <Marker
                  position={clickedLocation as L.LatLngExpression}
                  icon={defaultIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <strong>Potential Origin</strong>
                      <br />
                      <span className="text-sm text-gray-600">
                        Lat: {clickedLocation.lat.toFixed(6)}
                      </span>
                      <br />
                      <span className="text-sm text-gray-600">
                        Lng: {clickedLocation.lng.toFixed(6)}
                      </span>
                      <br />
                      <button
                        onClick={handleSetOriginFromClick}
                        className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 mr-1"
                      >
                        Set as Origin
                      </button>
                      <button
                        onClick={() => setClickedLocation(null)}
                        className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Route Polylines - Only show selected route */}
              {selectedRoute &&
                selectedRoute.type === "port" &&
                routePolylines.ports[selectedRoute.index] && (
                  <Polyline
                    positions={routePolylines.ports[selectedRoute.index]}
                    pathOptions={{
                      color: "#3b82f6",
                      weight: 4,
                      opacity: 0.8,
                    }}
                  />
                )}

              {selectedRoute &&
                selectedRoute.type === "airport" &&
                routePolylines.airports[selectedRoute.index] && (
                  <Polyline
                    positions={routePolylines.airports[selectedRoute.index]}
                    pathOptions={{
                      color: "#10b981",
                      weight: 4,
                      opacity: 0.8,
                    }}
                  />
                )}

              {selectedRoute &&
                selectedRoute.type === "highway" &&
                routePolylines.highways[selectedRoute.index] && (
                  <Polyline
                    positions={routePolylines.highways[selectedRoute.index]}
                    pathOptions={{
                      color: "#f59e0b",
                      weight: 4,
                      opacity: 0.8,
                    }}
                  />
                )}

              {/* Map Legend */}
              <MapLegend />
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

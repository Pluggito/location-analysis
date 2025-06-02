{/*"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Polygon } from "react-leaflet"
import L from "leaflet"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Plane, Anchor, Car, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Fix for default markers in React Leaflet
const createDefaultIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}

const createOriginIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [1, -44],
    shadowSize: [51, 51],
    className: "origin-marker",
  })
}

const portIcon = new L.Icon({
  iconUrl: "/port.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const airportIcon = new L.Icon({
  iconUrl: "/airport.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const highwayIcon = new L.Icon({
  iconUrl: "/highway.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const getTravelTimeBadgeColor = (timeString: string): "default" | "secondary" | "destructive" => {
  if (
    !timeString ||
    timeString.includes("Error") ||
    timeString.includes("Not calculated") ||
    timeString.includes("Calculating")
  ) {
    return "secondary"
  }

  const minutes = Number.parseInt(timeString.match(/\d+/)?.[0] || "0")
  if (minutes <= 15) return "default" // Green-ish
  if (minutes <= 30) return "secondary" // Yellow-ish
  return "destructive" // Red
}

const getAverageTime = (times: string[]): string => {
  const validTimes = times.filter(
    (time) => time && !time.includes("Error") && !time.includes("Not calculated") && !time.includes("Calculating"),
  )
  if (validTimes.length === 0) return "N/A"

  const totalMinutes = validTimes.reduce((sum, time) => {
    const minutes = Number.parseInt(time.match(/\d+/)?.[0] || "0")
    return sum + minutes
  }, 0)

  return `${Math.round(totalMinutes / validTimes.length)} mins`
}

// Click handler component
function MapClickHandler({
  onLocationClick,
}: {
  onLocationClick: (latlng: L.LatLng) => void
}) {
  useMapEvents({
    click(e) {
      onLocationClick(e.latlng)
    },
  })
  return null
}

// Map Legend Component
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
        <h4 className="font-bold mb-2 mt-4 text-sm">Zoning Types</h4>
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
        </div>
      </div>
    </div>
  )
}

interface ZolaMapProps {
  mapId: string
  initialOrigin?: L.LatLngTuple
  onError?: (error: Error) => void
}

export default function ZolaMap({ mapId, initialOrigin = [40.672828, -74.015271], onError }: ZolaMapProps) {
  const [origin, setOrigin] = useState<L.LatLngTuple>(initialOrigin)
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null)
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null)
  const [originIcon, setOriginIcon] = useState<L.Icon | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [portTravelTimes, setPortTravelTimes] = useState<string[]>([])
  const [airportTravelTimes, setAirportTravelTimes] = useState<string[]>([])
  const [highwayTravelTimes, setHighwayTravelTimes] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("travel-times")
  const [showZoningOverlay, setShowZoningOverlay] = useState(true)
  const [showTravelTimeZones, setShowTravelTimeZones] = useState(true)

  // Dummy data arrays
  const ports = [
    { name: "Red Hook Container Terminal", coords: [40.6793, -74.016], type: "Port" },
    { name: "Port Newark Container Terminal", coords: [40.684, -74.1513], type: "Port" },
    { name: "APM Terminal", coords: [40.6735, -74.1449], type: "Port" },
    { name: "GCT Bayonne Terminal", coords: [40.667, -74.086], type: "Port" },
    { name: "GCT New York Terminal", coords: [40.661, -74.0267], type: "Port" },
    { name: "Maher Terminal", coords: [40.6848, -74.1435], type: "Port" },
  ]

  const airports = [
    { name: "Newark International Airport", coords: [40.6895, -74.1745], type: "Airport" },
    { name: "LaGuardia Airport", coords: [40.7769, -73.874], type: "Airport" },
    { name: "JFK Airport", coords: [40.6413, -73.7781], type: "Airport" },
  ]

  const highways = [
    { name: "Route 9", coords: [40.7, -74.15], type: "Highway" },
    { name: "Route 440", coords: [40.6, -74.2], type: "Highway" },
    { name: "Route 78", coords: [40.7, -74.3], type: "Highway" },
    { name: "Route 278", coords: [40.7, -74.0], type: "Highway" },
    { name: "Route 95", coords: [40.8, -74.1], type: "Highway" },
  ]

  // Sample zoning areas (these would typically come from a GeoJSON file or API)
  const zoningAreas = [
    {
      name: "Industrial Zone A",
      type: "industrial",
      color: "blue",
      coordinates: [
        [40.675, -74.025],
        [40.685, -74.025],
        [40.685, -74.015],
        [40.675, -74.015],
      ],
    },
    {
      name: "Commercial Zone B",
      type: "commercial",
      color: "purple",
      coordinates: [
        [40.665, -74.035],
        [40.675, -74.035],
        [40.675, -74.025],
        [40.665, -74.025],
      ],
    },
    {
      name: "Residential Zone C",
      type: "residential",
      color: "orange",
      coordinates: [
        [40.685, -74.035],
        [40.695, -74.035],
        [40.695, -74.025],
        [40.685, -74.025],
      ],
    },
    {
      name: "Mixed Use Zone D",
      type: "mixed",
      color: "green",
      coordinates: [
        [40.675, -74.045],
        [40.685, -74.045],
        [40.685, -74.035],
        [40.675, -74.035],
      ],
    },
  ]

  useEffect(() => {
    try {
      setDefaultIcon(createDefaultIcon())
      setOriginIcon(createOriginIcon())
    } catch (error) {
      console.error("Error creating map icons:", error)
      onError?.(error as Error)
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
          mapRef.current = null
        } catch (error) {
          console.error("Error cleaning up map:", error)
        }
      }
    }
  }, [])

  const fetchTravelTime = async (originCoords: L.LatLngTuple, destination: [number, number]): Promise<string> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
      if (!baseUrl) {
        // Return mock data for demo purposes
        const mockTime = Math.floor(Math.random() * 60) + 10
        return `${mockTime} mins`
      }

      const response = await axios.post(`${baseUrl}/source/route`, {
        start: originCoords,
        end: destination,
      })

      if (!response.data || !response.data.travelTime) {
        throw new Error("Failed to fetch travel time")
      }

      return response.data.travelTime
    } catch (error) {
      console.error("Error fetching travel time:", error)
      // Return mock data as fallback
      const mockTime = Math.floor(Math.random() * 60) + 10
      return `${mockTime} mins`
    }
  }

  const calculateAllTravelTimes = async (originCoords: L.LatLngTuple) => {
    setIsCalculating(true)
    try {
      // Reset all travel times
      setPortTravelTimes([])
      setAirportTravelTimes([])
      setHighwayTravelTimes([])

      // Calculate travel times for ports
      const portTimes = await Promise.all(
        ports.map((port) => fetchTravelTime(originCoords, port.coords as [number, number])),
      )
      setPortTravelTimes(portTimes)

      // Calculate travel times for airports
      const airportTimes = await Promise.all(
        airports.map((airport) => fetchTravelTime(originCoords, airport.coords as [number, number])),
      )
      setAirportTravelTimes(airportTimes)

      // Calculate travel times for highways
      const highwayTimes = await Promise.all(
        highways.map((highway) => fetchTravelTime(originCoords, highway.coords as [number, number])),
      )
      setHighwayTravelTimes(highwayTimes)
    } catch (error) {
      console.error("Error calculating travel times:", error)
      onError?.(error as Error)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleLocationClick = (latlng: L.LatLng) => {
    setClickedLocation(latlng)
  }

  const setNewOrigin = (newOrigin: L.LatLngTuple) => {
    setOrigin(newOrigin)
    calculateAllTravelTimes(newOrigin)
  }

  const handleSetOriginFromClick = () => {
    if (clickedLocation) {
      const newOrigin: L.LatLngTuple = [clickedLocation.lat, clickedLocation.lng]
      setNewOrigin(newOrigin)
      setClickedLocation(null)
    }
  }

  const handleMapCreated = (map: L.Map) => {
    mapRef.current = map
  }

  // Calculate initial travel times
  useEffect(() => {
    calculateAllTravelTimes(origin)
  }, [])

  // Helper function to get color based on travel time
  const getTravelTimeColor = (timeString: string): string => {
    if (
      !timeString ||
      timeString.includes("Error") ||
      timeString.includes("Not calculated") ||
      timeString.includes("Calculating")
    ) {
      return "#888888"
    }

    const minutes = Number.parseInt(timeString.match(/\d+/)?.[0] || "0")
    if (minutes <= 15) return "#4ade80" // Green
    if (minutes <= 30) return "#facc15" // Yellow
    return "#ef4444" // Red
  }

  // Helper function to get zoning area color
  const getZoningColor = (type: string): string => {
    switch (type) {
      case "industrial":
        return "#1d4ed8"
      case "commercial":
        return "#7e22ce"
      case "residential":
        return "#ea580c"
      case "mixed":
        return "#15803d"
      default:
        return "#6b7280"
    }
  }

  if (!defaultIcon || !originIcon) {
    return (
      <div className="h-[450px] w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading map resources...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Map Controls 
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Map Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="zoning-overlay"
                checked={showZoningOverlay}
                onChange={(e) => setShowZoningOverlay(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="zoning-overlay" className="text-sm font-medium">
                Show Zoning Overlay
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="travel-time-zones"
                checked={showTravelTimeZones}
                onChange={(e) => setShowTravelTimeZones(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="travel-time-zones" className="text-sm font-medium">
                Show Travel Time Zones
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Travel Times and Zoning Info 
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="travel-times">Travel Times</TabsTrigger>
          <TabsTrigger value="zoning-info">Zoning Information</TabsTrigger>
        </TabsList>

        <TabsContent value="travel-times" className="mt-4">
          {/* Travel Times Dashboard *
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ports Card *
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Anchor className="h-5 w-5 text-blue-600" />
                  Ports
                  <Badge variant="outline" className="ml-auto">
                    Avg: {getAverageTime(portTravelTimes)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ports.map((port, idx) => (
                  <div
                    key={`port-card-${idx}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{port.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {port.coords[0].toFixed(3)}, {port.coords[1].toFixed(3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Badge variant={getTravelTimeBadgeColor(portTravelTimes[idx])}>
                        {isCalculating ? "..." : portTravelTimes[idx] || "Not calculated"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Airports Card *
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plane className="h-5 w-5 text-green-600" />
                  Airports
                  <Badge variant="outline" className="ml-auto">
                    Avg: {getAverageTime(airportTravelTimes)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {airports.map((airport, idx) => (
                  <div
                    key={`airport-card-${idx}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{airport.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {airport.coords[0].toFixed(3)}, {airport.coords[1].toFixed(3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Badge variant={getTravelTimeBadgeColor(airportTravelTimes[idx])}>
                        {isCalculating ? "..." : airportTravelTimes[idx] || "Not calculated"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Highways Card *
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Car className="h-5 w-5 text-orange-600" />
                  Highways
                  <Badge variant="outline" className="ml-auto">
                    Avg: {getAverageTime(highwayTravelTimes)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {highways.map((highway, idx) => (
                  <div
                    key={`highway-card-${idx}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Highway {highway.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {highway.coords[0].toFixed(3)}, {highway.coords[1].toFixed(3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Badge variant={getTravelTimeBadgeColor(highwayTravelTimes[idx])}>
                        {isCalculating ? "..." : highwayTravelTimes[idx] || "Not calculated"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zoning-info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Zoning Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  This map displays various zoning areas in the region. Each color represents a different zoning type.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {zoningAreas.map((zone, idx) => (
                    <div key={`zone-info-${idx}`} className="border rounded-lg p-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-sm"
                          style={{ backgroundColor: getZoningColor(zone.type) }}
                        ></div>
                        {zone.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 capitalize">Type: {zone.type}</p>
                      <p className="text-sm text-gray-600">
                        Coordinates: {zone.coordinates[0][0].toFixed(3)}, {zone.coordinates[0][1].toFixed(3)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-gray-500">
                <Info className="h-4 w-4 mr-2" />
                Zoning data is displayed on the map as colored polygons. Toggle the "Show Zoning Overlay" option to view
                or hide these areas.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Map Section 
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
                  handleMapCreated(mapRef.current)
                }
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* NYC Zoning Districts Layer 
              {showZoningOverlay && (
                <TileLayer
                  url="https://a816-dcpgis.nyc.gov/arcgis/rest/services/Zoning/Zoning_Districts/MapServer/tile/{z}/{y}/{x}"
                  opacity={0.7}
                  attribution="NYC Department of City Planning"
                />
              )}

              <MapClickHandler onLocationClick={handleLocationClick} />

              {/* Travel Time Zones 
              {showTravelTimeZones && (
                <>
                  {/* 0-15 minute zone (green) 
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
                        <span className="text-xs text-green-600">Quick access area</span>
                      </div>
                    </Popup>
                  </Circle>

                  {/* 16-30 minute zone (yellow) 
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
                        <span className="text-xs text-yellow-600">Medium access area</span>
                      </div>
                    </Popup>
                  </Circle>

                  {/* 30+ minute zone (red) 
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
                        <span className="text-xs text-red-600">Extended travel area</span>
                      </div>
                    </Popup>
                  </Circle>
                </>
              )}

              {/* Zoning Areas 
              {showZoningOverlay &&
                zoningAreas.map((zone, idx) => (
                  <Polygon
                    key={`zone-${idx}`}
                    positions={zone.coordinates as L.LatLngExpression[]}
                    pathOptions={{
                      fillColor: getZoningColor(zone.type),
                      fillOpacity: 0.6,
                      color: getZoningColor(zone.type),
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>{zone.name}</strong>
                        <br />
                        <span className="text-xs capitalize">Type: {zone.type}</span>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

              {/* Origin marker 
              <Marker position={origin as L.LatLngExpression} icon={originIcon}>
                <Popup>
                  <div className="text-center">
                    <strong>Origin Point</strong>
                    <br />
                    <span className="text-sm text-gray-600">Lat: {origin[0].toFixed(6)}</span>
                    <br />
                    <span className="text-sm text-gray-600">Lng: {origin[1].toFixed(6)}</span>
                    <br />
                    <span className="text-xs text-green-600 font-medium">Travel times calculated from here</span>
                  </div>
                </Popup>
              </Marker>

              {/* Ports 
              {ports.map(({ name, coords, type }, idx) => (
                <Marker key={`port-${idx}`} position={coords as L.LatLngExpression} icon={portIcon}>
                  <Popup>
                    <strong>{name}</strong>
                    <br />
                    <span>Type: {type}</span>
                    <br />
                    <span>
                      Travel Time: {isCalculating ? "Calculating..." : portTravelTimes[idx] || "Not calculated"}
                    </span>
                  </Popup>
                </Marker>
              ))}

              {/* Airports 
              {airports.map(({ name, coords, type }, idx) => (
                <Marker key={`airport-${idx}`} position={coords as L.LatLngExpression} icon={airportIcon}>
                  <Popup>
                    <strong>{name}</strong>
                    <br />
                    <span>Type: {type}</span>
                    <br />
                    <span>
                      Travel Time: {isCalculating ? "Calculating..." : airportTravelTimes[idx] || "Not calculated"}
                    </span>
                  </Popup>
                </Marker>
              ))}

              {/* Highways 
              {highways.map(({ name, coords, type }, idx) => (
                <Marker key={`highway-${idx}`} position={coords as L.LatLngExpression} icon={highwayIcon}>
                  <Popup>
                    <strong>Highway {name}</strong>
                    <br />
                    <span>Type: {type}</span>
                    <br />
                    <span>
                      Travel Time: {isCalculating ? "Calculating..." : highwayTravelTimes[idx] || "Not calculated"}
                    </span>
                  </Popup>
                </Marker>
              ))}

              {/* Clicked location marker 
              {clickedLocation && (
                <Marker position={clickedLocation as L.LatLngExpression} icon={defaultIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong>Potential Origin</strong>
                      <br />
                      <span className="text-sm text-gray-600">Lat: {clickedLocation.lat.toFixed(6)}</span>
                      <br />
                      <span className="text-sm text-gray-600">Lng: {clickedLocation.lng.toFixed(6)}</span>
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

              {/* Map Legend 
              <MapLegend />
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
*/}


export default function ZoningPPage(){
  return(
    <div>
      Hey i work 
    </div>
  )
}
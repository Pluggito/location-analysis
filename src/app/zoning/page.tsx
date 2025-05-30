"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import L from "leaflet"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Plane, Anchor, Car } from "lucide-react"

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
  if (minutes <= 20) return "default" // Green-ish
  if (minutes <= 40) return "secondary" // Yellow-ish
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

      const response = await axios.post(`${baseUrl}/source/travel`, {
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

  if (!defaultIcon || !originIcon) {
    return (
      <div className="h-[450px] w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading map resources...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel Time Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={() => setNewOrigin([40.672828, -74.015271])} variant="outline" size="sm">
              Set Brooklyn Origin
            </Button>
            <Button onClick={() => setNewOrigin([40.7589, -73.9851])} variant="outline" size="sm">
              Set Manhattan Origin
            </Button>
            {clickedLocation && (
              <Button onClick={handleSetOriginFromClick} variant="default" size="sm">
                Set Origin to Clicked Location
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-600 mb-2">
            Current Origin: {origin[0].toFixed(6)}, {origin[1].toFixed(6)}
            {isCalculating && <span className="ml-2 text-blue-600">Calculating travel times...</span>}
          </div>

          <p className="text-sm text-gray-500">
            Click on the map to select a new potential origin, then use the button above to set it.
          </p>
        </CardContent>
      </Card>

      {/* Travel Times Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ports Card */}
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

        {/* Airports Card */}
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

        {/* Highways Card */}
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

      {/* Map Section */}
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

              <TileLayer
                url="https://a816-dcpgis.nyc.gov/arcgis/rest/services/Zoning/Zoning_Districts/MapServer/tile/{z}/{y}/{x}"
                opacity={0.7}
                attribution="NYC Department of City Planning"
              />

              <MapClickHandler onLocationClick={handleLocationClick} />

              {/* Origin marker */}
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

              {/* Ports */}
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

              {/* Airports */}
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

              {/* Highways */}
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

              {/* Clicked location marker */}
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
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

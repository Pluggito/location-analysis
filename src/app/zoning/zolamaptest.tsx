"use client"
import { MapContainer, TileLayer, Popup, useMapEvents, Circle, Marker, Polyline, GeoJSON } from "react-leaflet"
import L from "leaflet"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Anchor, MapPin, Clock, Plane, Car, Info, Building2, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react"

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

// Key Location Icon
const keyLocationIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const portIcon = new L.Icon({
  iconUrl: "/placeholder.svg?height=30&width=30",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const airportIcon = new L.Icon({
  iconUrl: "/placeholder.svg?height=30&width=30",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const highwayIcon = new L.Icon({
  iconUrl: "/placeholder.svg?height=30&width=30",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

//handler for map click events
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

// Enhanced Property Information Panel
function PropertyInfoPanel({
  showPortOverlay,
  setShowPortOverlay,
  showAirportOverlay,
  setShowAirportOverlay,
  showHighwayOverlay,
  setShowHighwayOverlay,
  showKeyLocationOverlay,
  setShowKeyLocationOverlay,
  showTravelTimeZones,
  setShowTravelTimeZones,
  showZoningOverlay,
  setShowZoningOverlay,
}: {
  showPortOverlay: boolean
  setShowPortOverlay: (show: boolean) => void
  showAirportOverlay: boolean
  setShowAirportOverlay: (show: boolean) => void
  showHighwayOverlay: boolean
  setShowHighwayOverlay: (show: boolean) => void
  showKeyLocationOverlay: boolean
  setShowKeyLocationOverlay: (show: boolean) => void
  showTravelTimeZones: boolean
  setShowTravelTimeZones: (show: boolean) => void
  showZoningOverlay: boolean
  setShowZoningOverlay: (show: boolean) => void
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showZoningDescription, setShowZoningDescription] = useState(false)

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar bg-white rounded-lg shadow-lg m-4 max-w-sm">
        {/* Header with collapse button */}
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-bold text-sm">Property Information</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-6 w-6 p-0">
            {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="p-3 space-y-4">
            {/* Property Address */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">280 Richards St</p>
                  <p className="text-xs text-gray-600">Brooklyn, NY 11231</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm">Warehouse</span>
              </div>
            </div>

            <Separator />

            {/* Property Details */}
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-600 gap-1">
                <span>Brooklyn (Borough 3)</span>
                <span>•</span>
                <span>Block 612</span>
                <span>•</span>
                <span>Lot 150</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Zoning District: M3-1</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowZoningDescription(!showZoningDescription)}
                    className="h-6 w-6 p-0"
                  >
                    <Info className="h-3 w-3" />
                  </Button>
                </div>

                {showZoningDescription && (
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <p className="text-gray-700">
                      M3-1 districts are intended for heavy manufacturing and industrial uses. They allow a wide range
                      of manufacturing, warehousing, and distribution activities.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Layer Controls */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Map Layers</h4>

              {/* Zoning Overlay */}
              <div className="flex items-center justify-between">
                <label htmlFor="zoning-overlay" className="text-sm cursor-pointer">
                  Zoning Districts
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowZoningOverlay(!showZoningOverlay)}
                  className="h-6 w-12 p-0"
                >
                  {showZoningOverlay ? (
                    <Eye className="h-3 w-3 text-green-600" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Travel Time Zones */}
              <div className="flex items-center justify-between">
                <label htmlFor="travel-zones" className="text-sm cursor-pointer">
                  Travel Time Zones
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTravelTimeZones(!showTravelTimeZones)}
                  className="h-6 w-12 p-0"
                >
                  {showTravelTimeZones ? (
                    <Eye className="h-3 w-3 text-green-600" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Proximity Zones */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Proximity Zones</h4>

              <div className="grid grid-cols-2 gap-2">
                {/* Ports */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Anchor className="h-3 w-3 text-blue-600" />
                    <label htmlFor="port-overlay" className="text-xs cursor-pointer">
                      Ports
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPortOverlay(!showPortOverlay)}
                    className="h-5 w-8 p-0"
                  >
                    {showPortOverlay ? (
                      <Eye className="h-3 w-3 text-blue-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* Airports */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Plane className="h-3 w-3 text-green-600" />
                    <label htmlFor="airport-overlay" className="text-xs cursor-pointer">
                      Airports
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAirportOverlay(!showAirportOverlay)}
                    className="h-5 w-8 p-0"
                  >
                    {showAirportOverlay ? (
                      <Eye className="h-3 w-3 text-green-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* Highways */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3 text-orange-600" />
                    <label htmlFor="highway-overlay" className="text-xs cursor-pointer">
                      Highways
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHighwayOverlay(!showHighwayOverlay)}
                    className="h-5 w-8 p-0"
                  >
                    {showHighwayOverlay ? (
                      <Eye className="h-3 w-3 text-orange-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* Key Locations */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-purple-600" />
                    <label htmlFor="key-location-overlay" className="text-xs cursor-pointer">
                      Key Areas
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowKeyLocationOverlay(!showKeyLocationOverlay)}
                    className="h-5 w-8 p-0"
                  >
                    {showKeyLocationOverlay ? (
                      <Eye className="h-3 w-3 text-purple-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Travel Time Legend */}
            {showTravelTimeZones && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Travel Time Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
                      <span className="text-xs">0-15 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
                      <span className="text-xs">16-30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
                      <span className="text-xs">30+ minutes</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

//Zola map props here
interface ZolaMapPageProps {
  mapId: string
  initialOrigin?: L.LatLngTuple
  onError?: (error: Error) => void
}

export default function ZoningMapPage({ mapId, initialOrigin = [40.672828, -74.015271], onError }: ZolaMapPageProps) {
  const [origin, setOrigin] = useState<L.LatLngTuple>(initialOrigin)
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null)
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null)
  const [originIcon, setOriginIcon] = useState<L.Icon | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [portTravelData, setPortTravelData] = useState<RouteData[]>([])
  const [airportTravelData, setAirportTravelData] = useState<RouteData[]>([])
  const [highwayTravelData, setHighwayTravelData] = useState<RouteData[]>([])
  const [keyLocationTravelData, setKeyLocationTravelData] = useState<RouteData[]>([])
  const [activeTab, setActiveTab] = useState("travel-times")

  // Enhanced layer controls
  const [showZoningOverlay, setShowZoningOverlay] = useState(true)
  const [showTravelTimeZones, setShowTravelTimeZones] = useState(true)
  const [showPortOverlay, setShowPortOverlay] = useState(true)
  const [showAirportOverlay, setShowAirportOverlay] = useState(true)
  const [showHighwayOverlay, setShowHighwayOverlay] = useState(true)
  const [showKeyLocationOverlay, setShowKeyLocationOverlay] = useState(true)

  //Zoning District
  const [commercialData, setCommercialData] = useState(null);
  const [specialDistrictData, setSpecialDistrictData] = useState(null);
  const [limitedHeightData, setLimitedHeightData] = useState(null); 

  const [selectedRoute, setSelectedRoute] = useState<{
    type: "port" | "airport" | "highway" | "keyLocation"
    index: number
  } | null>(null)
  const [routePolylines, setRoutePolylines] = useState<{
    ports: L.LatLngTuple[][]
    airports: L.LatLngTuple[][]
    highways: L.LatLngTuple[][]
    keyLocations: L.LatLngTuple[][]
  }>({
    ports: [],
    airports: [],
    highways: [],
    keyLocations: [],
  })

    useEffect(() => {
    fetch('/commercialzoning.geojson')
      .then(res => res.json())
      .then(data => setCommercialData(data));

    fetch('/specialdistrict.geojson')
      .then(res => res.json())
      .then(data => setSpecialDistrictData(data));

    fetch('/limitedheight.geojson') // 🆕 your new file
      .then(res => res.json())
      .then(data => setLimitedHeightData(data));
  }, []);

   const overlayColorMap: Record<string, string> = {
    'C1-2': '#ff6600',
    'C1-3': '#ffa500',
    'C2-4': '#ff3333',
    'C4-3': '#33ccff',
  };

  const commercialStyle = (feature: any) => {
    const overlay = feature.properties.OVERLAY;
    const color = overlayColorMap[overlay] || 'orange';
    return { color, weight: 2, fillOpacity: 0.3 };
  };

  const onEachCommercial = (feature: any, layer: any) => {
    const { OVERLAY } = feature.properties;
    layer.bindTooltip(`Overlay: ${OVERLAY}`, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  const specialStyle = () => ({ color: '#8e44ad', weight: 2, fillOpacity: 0.15 });

  const onEachSpecial = (feature: any, layer: any) => {
    const label = feature.properties.SDNAME || 'Special District';
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  // 🆕 Limited Height style and tooltip
  const lhStyle = () => ({ color: '#2ecc71', weight: 2, fillOpacity: 0.2 });

  const onEachLH = (feature: any, layer: any) => {
    const label = `${feature.properties.LHNAME} (${feature.properties.LHLBL})`;
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  // CORRECTED DATA ARRAYS - Fixed coordinate order and added missing data
  const ports = [
    {
      name: "Red Hook Container Terminal",
      coords: [40.6793, -74.016], // Fixed: lat, lng order
      type: "Port",
    },
    {
      name: "Port Newark Container Terminal",
      coords: [40.684, -74.1513], // Fixed: lat, lng order
      type: "Port",
    },
    {
      name: "APM Terminal",
      coords: [40.6735, -74.1449], // Fixed: lat, lng order
      type: "Port",
    },
    {
      name: "GCT Bayonne Terminal",
      coords: [40.667, -74.086], // Fixed: lat, lng order
      type: "Port",
    },
    {
      name: "GCT New York Terminal",
      coords: [40.6375182, -74.3377233], // Fixed: lat, lng order
      type: "Port",
    },
    {
      name: "Maher Terminal",
      coords: [40.6848, -74.1435], // Fixed: lat, lng order
      type: "Port",
    },
  ]

  const airports = [
    {
      name: "Newark International Airport",
      coords: [40.6895, -74.1745], // Fixed: lat, lng order
      type: "Airport",
    },
    {
      name: "LaGuardia Airport",
      coords: [40.7769, -73.874], // Fixed: lat, lng order
      type: "Airport",
    },
    {
      name: "JFK Airport",
      coords: [40.6413, -73.7781], // Fixed: lat, lng order
      type: "Airport",
    },
  ]

  const highways = [
    {
      name: "Route 9",
      coords: [40.7, -74.15], // Fixed: lat, lng order
      type: "Highway",
    },
    {
      name: "Route 440",
      coords: [40.6, -74.2], // Fixed: lat, lng order
      type: "Highway",
    },
    {
      name: "Route 78",
      coords: [40.7, -74.3], // Fixed: lat, lng order
      type: "Highway",
    },
    {
      name: "Route 278",
      coords: [40.7, -74.0], // Fixed: lat, lng order
      type: "Highway",
    },
    {
      name: "Route 95",
      coords: [40.8, -74.1], // Fixed: lat, lng order
      type: "Highway",
    },
  ]

  const keyLocations = [
    {
      name: "Downtown Brooklyn",
      coords: [40.6837931, -74.0205842], // Fixed: lat, lng order
    },
    {
      name: "Downtown Manhattan",
      coords: [40.7240928, -74.1046052], // Fixed: lat, lng order
    },
    {
      name: "New Jersey Turnpike",
      coords: [40.6791233, -74.1834806], // Fixed: lat, lng order
    },
    {
      name: "Staten Island",
      coords: [40.6312628, -74.1560783], // Fixed: lat, lng order
    },
  ]

  useEffect(() => {
    try {
      setDefaultIcon(createDefaultIcon())
      setOriginIcon(createOriginIcon())
    } catch (error) {
      console.error("Error creating map icons:", error)
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

  type RouteData = {
    duration: number // in seconds
    distance: number // in meters
    polyline: string | L.LatLngTuple[] // encoded polyline or coordinate array
    error?: string | null // Add error field
  }

  // Update the fetchTravelTime function to handle TomTom-specific errors
  const fetchTravelTime = async (originCoords: L.LatLngTuple, destination: L.LatLngTuple): Promise<RouteData> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
      if (!baseUrl) {
        console.warn("API base URL not set")
        return {
          duration: -1,
          distance: -1,
          polyline: "",
          error: "API base URL not configured",
        }
      }

      const response = await axios.post(`${baseUrl}/source/route`, {
        start: [destination[1], destination[0]], // Convert to lng, lat for API
        end: [originCoords[1], originCoords[0]], // Convert to lng, lat for API
      })

      const data = response.data

      if (!data) {
        throw new Error("No data received from API")
      }

      const duration = data.travelTime || data.duration || data.time || 0
      const distance = data.distance || 0
      const polyline = data.polyline || data.route || ""

      return {
        duration: typeof duration === "number" ? duration : 0,
        distance: typeof distance === "number" ? distance : 0,
        polyline: polyline,
        error: null,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message)

        // Handle TomTom specific errors
        const tomTomError = error.response?.data?.detailedError
        if (tomTomError?.code === "MAP_MATCHING_FAILURE") {
          return {
            duration: -1,
            distance: -1,
            polyline: "",
            error: `Location not on navigable road: ${tomTomError.message}`,
          }
        }
      } else {
        console.error("Unexpected error:", error)
      }

      return {
        duration: -1,
        distance: -1,
        polyline: "",
        error: "Failed to calculate route",
      }
    }
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const throttledFetchTravelTimes = async (
    originCoords: L.LatLngTuple,
    locations: { coords: L.LatLngTuple }[], // Fixed type
    delayMs = 300,
  ): Promise<RouteData[]> => {
    const results: RouteData[] = []

    for (const loc of locations) {
      const routeData = await fetchTravelTime(originCoords, loc.coords)
      results.push(routeData)
      await delay(delayMs)
    }

    return results
  }

 const calculateAllTravelTimes = async (originCoords: L.LatLngTuple) => {
    setIsCalculating(true);
    try {
      // Reset all travel data
      setPortTravelData([]);
      setAirportTravelData([]);
      setHighwayTravelData([]);
      setKeyLocationTravelData([]);
      setRoutePolylines({
        ports: [],
        airports: [],
        highways: [],
        keyLocations: [],
      });

      // Calculate travel times for all location types
      const portRoutes = await throttledFetchTravelTimes(
        originCoords,
        ports.map((p) => ({ coords: p.coords as [number, number] }))
      );
      setPortTravelData(portRoutes);

      const airportRoutes = await throttledFetchTravelTimes(
        originCoords,
        airports.map((a) => ({ coords: a.coords as [number, number] }))
      );
      setAirportTravelData(airportRoutes);

      const highwayRoutes = await throttledFetchTravelTimes(
        originCoords,
        highways.map((h) => ({ coords: h.coords as [number, number] }))
      );
      setHighwayTravelData(highwayRoutes);

      const keyLocationRoutes = await throttledFetchTravelTimes(
        originCoords,
        keyLocations.map((k) => ({ coords: k.coords as [number, number] }))
      );
      setKeyLocationTravelData(keyLocationRoutes);

      // Extract polylines
      const extractPolylines = (routes: RouteData[]) =>
        routes
          .map((route) => (Array.isArray(route.polyline) ? route.polyline : []))
          .filter((polyline) => polyline.length > 0);

      setRoutePolylines({
        ports: extractPolylines(portRoutes),
        airports: extractPolylines(airportRoutes),
        highways: extractPolylines(highwayRoutes),
        keyLocations: extractPolylines(keyLocationRoutes),
      });
    } catch (error) {
      console.error("Error calculating travel times:", error);
      if (onError) {
        onError(error as Error);
      }
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (origin) {
      calculateAllTravelTimes(origin)
    }
  }, [origin])

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

  const handleDirectionsClick = (type: "port" | "airport" | "highway" | "keyLocation", index: number) => {
    if (selectedRoute?.type === type && selectedRoute?.index === index) {
      setSelectedRoute(null)
    } else {
      setSelectedRoute({ type, index })
    }
  }

  if (!defaultIcon || !originIcon) {
    return (
      <div className="h-[450px] w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading map resources...</p>
      </div>
    )
  }

  function getTravelTimeBadgeColor(
    route: RouteData | undefined,
  ): "default" | "secondary" | "destructive" | "outline" | null | undefined {
    if (!route || typeof route.duration !== "number" || route.duration < 0) {
      return "secondary"
    }
    const minutes = Math.round(route.duration / 60)
    if (minutes <= 15) return "default" // Green
    if (minutes <= 30) return "secondary" // Yellow
    return "destructive" // Red
  }

  function getAverageTime(travelData: RouteData[]): string {
    const validDurations = travelData
      .map((d) => d.duration)
      .filter((duration) => typeof duration === "number" && duration > 0)
    if (validDurations.length === 0) return "N/A"
    const avgSeconds = validDurations.reduce((sum, dur) => sum + dur, 0) / validDurations.length
    const avgMinutes = avgSeconds / 60
    return `${Math.round(avgMinutes)} mins`
  }

  // Update the formatTravelTime function to display specific error messages
  function formatTravelTime(route: RouteData | undefined): string {
    if (!route) return "Not available"
    if (route.error) return route.error.includes("navigable") ? "No road access" : "Error fetching data"
    if (route.duration === -1) return "Error fetching data"
    if (typeof route.duration !== "number" || route.duration <= 0) {
      return "Not available"
    }
    const minutes = Math.round(route.duration / 60)
    return minutes > 0 ? `${minutes} mins` : `${route.duration} secs`
  }

  // Update the formatDistance function to handle errors
  function formatDistance(route: RouteData | undefined): string {
    if (!route) return "Not available"
    if (route.error) return "N/A"
    if (route.distance === -1) return "Not available"
    if (typeof route.distance !== "number" || route.distance <= 0) {
      return "Not available"
    }
    return `${(route.distance / 1000).toFixed(2)} km`
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="travel-times">Travel Times</TabsTrigger>
          <TabsTrigger value="zoning-info">Zoning Information</TabsTrigger>
        </TabsList>

        <TabsContent value="travel-times" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Ports Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Anchor className="h-5 w-5 text-blue-600" />
                  Ports
                  <Badge variant="outline" className="ml-auto">
                    Avg: {getAverageTime(portTravelData)}
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
                      <Badge variant={getTravelTimeBadgeColor(portTravelData[idx])}>
                        {isCalculating ? "..." : formatTravelTime(portTravelData[idx])}
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
                    Avg: {getAverageTime(airportTravelData)}
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
                      <Badge variant={getTravelTimeBadgeColor(airportTravelData[idx])}>
                        {isCalculating ? "..." : formatTravelTime(airportTravelData[idx])}
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
                    Avg: {getAverageTime(highwayTravelData)}
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
                      <Badge variant={getTravelTimeBadgeColor(highwayTravelData[idx])}>
                        {isCalculating ? "..." : formatTravelTime(highwayTravelData[idx])}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Key Locations Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Key Locations
                  <Badge variant="outline" className="ml-auto">
                    Avg: {getAverageTime(keyLocationTravelData)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {keyLocations.map((location, idx) => (
                  <div
                    key={`key-location-card-${idx}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{location.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location.coords[0].toFixed(3)}, {location.coords[1].toFixed(3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Badge variant={getTravelTimeBadgeColor(keyLocationTravelData[idx])}>
                        {isCalculating ? "..." : formatTravelTime(keyLocationTravelData[idx])}
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

      {/* Map Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[650px] w-full rounded-lg overflow-hidden relative">
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
              {showPortOverlay &&
                ports.map(({ name, coords, type }, idx) => (
                  <Marker key={`port-${idx}`} position={coords as L.LatLngExpression} icon={portIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>{name}</strong>
                        <br />
                        <span>Type: {type}</span>
                        <br />
                        <span>Travel Time: {formatTravelTime(portTravelData[idx])}</span>
                        <br />
                        <span>Distance: {formatDistance(portTravelData[idx])}</span>
                        <br />
                        <span>
                          Travel Mode: <b>Car</b>
                        </span>
                        <br />
                        <button
                          onClick={() => handleDirectionsClick("port", idx)}
                          className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                            selectedRoute?.type === "port" && selectedRoute?.index === idx
                              ? "bg-green-700"
                              : "bg-green-600"
                          }`}
                        >
                          {selectedRoute?.type === "port" && selectedRoute?.index === idx ? "Hide Route" : "Directions"}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* Airports */}
              {showAirportOverlay &&
                airports.map(({ name, coords, type }, idx) => (
                  <Marker key={`airport-${idx}`} position={coords as L.LatLngExpression} icon={airportIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>{name}</strong>
                        <br />
                        <span>Type: {type}</span>
                        <br />
                        <span>Travel Time: {formatTravelTime(airportTravelData[idx])}</span>
                        <br />
                        <span>Distance: {formatDistance(airportTravelData[idx])}</span>
                        <br />
                        <span>
                          Travel Mode: <b>Car</b>
                        </span>
                        <br />
                        <button
                          onClick={() => handleDirectionsClick("airport", idx)}
                          className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                            selectedRoute?.type === "airport" && selectedRoute?.index === idx
                              ? "bg-green-700"
                              : "bg-green-600"
                          }`}
                        >
                          {selectedRoute?.type === "airport" && selectedRoute?.index === idx
                            ? "Hide Route"
                            : "Directions"}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* Highways */}
              {showHighwayOverlay &&
                highways.map(({ name, coords, type }, idx) => (
                  <Marker key={`highway-${idx}`} position={coords as L.LatLngExpression} icon={highwayIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>Highway {name}</strong>
                        <br />
                        <span>Type: {type}</span>
                        <br />
                        <span>Travel Time: {formatTravelTime(highwayTravelData[idx])}</span>
                        <br />
                        <span>Distance: {formatDistance(highwayTravelData[idx])}</span>
                        <br />
                        <span>
                          Travel Mode: <b>Car</b>
                        </span>
                        <br />
                        <button
                          onClick={() => handleDirectionsClick("highway", idx)}
                          className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                            selectedRoute?.type === "highway" && selectedRoute?.index === idx
                              ? "bg-green-700"
                              : "bg-green-600"
                          }`}
                        >
                          {selectedRoute?.type === "highway" && selectedRoute?.index === idx
                            ? "Hide Route"
                            : "Directions"}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* Key Locations */}
              {showKeyLocationOverlay &&
                keyLocations.map(({ name, coords }, idx) => (
                  <Marker key={`key-location-${idx}`} position={coords as L.LatLngExpression} icon={keyLocationIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>{name}</strong>
                        <br />
                        <span>Travel Time: {formatTravelTime(keyLocationTravelData[idx])}</span>
                        <br />
                        <span>Distance: {formatDistance(keyLocationTravelData[idx])}</span>
                        <br />
                        <span>
                          Coordinates: {coords[0].toFixed(3)}, {coords[1].toFixed(3)}
                        </span>
                        <br />
                        <button
                          onClick={() => handleDirectionsClick("keyLocation", idx)}
                          className={`mt-2 px-2 py-1 text-white text-xs rounded hover:bg-green-700 ${
                            selectedRoute?.type === "keyLocation" && selectedRoute?.index === idx
                              ? "bg-green-700"
                              : "bg-green-600"
                          }`}
                        >
                          {selectedRoute?.type === "keyLocation" && selectedRoute?.index === idx
                            ? "Hide Route"
                            : "Directions"}
                        </button>
                      </div>
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

              {/* Route Polylines */}
              {selectedRoute && selectedRoute.type === "port" && routePolylines.ports[selectedRoute.index] && (
                <Polyline
                  positions={routePolylines.ports[selectedRoute.index]}
                  pathOptions={{
                    color: "#3b82f6",
                    weight: 4,
                    opacity: 0.8,
                  }}
                />
              )}

              {selectedRoute && selectedRoute.type === "airport" && routePolylines.airports[selectedRoute.index] && (
                <Polyline
                  positions={routePolylines.airports[selectedRoute.index]}
                  pathOptions={{
                    color: "#10b981",
                    weight: 4,
                    opacity: 0.8,
                  }}
                />
              )}

              {selectedRoute && selectedRoute.type === "highway" && routePolylines.highways[selectedRoute.index] && (
                <Polyline
                  positions={routePolylines.highways[selectedRoute.index]}
                  pathOptions={{
                    color: "#f59e0b",
                    weight: 4,
                    opacity: 0.8,
                  }}
                />
              )}

              {selectedRoute &&
                selectedRoute.type === "keyLocation" &&
                routePolylines.keyLocations[selectedRoute.index] && (
                  <Polyline
                    positions={routePolylines.keyLocations[selectedRoute.index]}
                    pathOptions={{
                      color: "#8b5cf6",
                      weight: 4,
                      opacity: 0.8,
                    }}
                  />
                )}

              {/* Enhanced Property Information Panel */}
              <PropertyInfoPanel
                showPortOverlay={showPortOverlay}
                setShowPortOverlay={setShowPortOverlay}
                showAirportOverlay={showAirportOverlay}
                setShowAirportOverlay={setShowAirportOverlay}
                showHighwayOverlay={showHighwayOverlay}
                setShowHighwayOverlay={setShowHighwayOverlay}
                showKeyLocationOverlay={showKeyLocationOverlay}
                setShowKeyLocationOverlay={setShowKeyLocationOverlay}
                showTravelTimeZones={showTravelTimeZones}
                setShowTravelTimeZones={setShowTravelTimeZones}
                showZoningOverlay={showZoningOverlay}
                setShowZoningOverlay={setShowZoningOverlay}
              />

              {/* Zoning Data Layers */}
              {showZoningOverlay && (
                <div>
                  {commercialData && (
                      <GeoJSON data={commercialData} style={commercialStyle} onEachFeature={onEachCommercial} />
                    )}
              
                    {specialDistrictData && (
                      <GeoJSON data={specialDistrictData} style={specialStyle} onEachFeature={onEachSpecial} />
                    )}
              
                    {limitedHeightData && (
                      <GeoJSON data={limitedHeightData} style={lhStyle} onEachFeature={onEachLH} />
                    )}
                </div>
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

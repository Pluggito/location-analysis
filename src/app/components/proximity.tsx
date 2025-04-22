"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, RouteIcon as Road, Train, Anchor, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"
import { useEffect, useState } from "react"
import axios from "axios"

interface ProximityProps {
  loading: boolean
  setLoading: (value: boolean) => void
}

interface Highway {
  state: string;
  sign: number;
  name: string;
  distance: string;
}

interface Port {
  name: string;
  distance: string;
  insights: string;
}

interface Airport {
  name: string;
  distance: string;
}

interface MajorTenant {
  name: string;
  company: string;
}

interface KeyLocation {
  location: string;
  distance: number;
  time: number;
  insight: string;
}

interface ProximityInsights {
  highways: Highway[];
  ports: Port[];
  airports: Airport[];
  major_tenants: MajorTenant[];
  key_location: KeyLocation[];
}

interface ApiResponse {
  proximityInsights: ProximityInsights;
  success?: boolean;
  error?: string;
}

const Proximity: React.FC<ProximityProps> = ({ loading, setLoading }) => {
  const [proximityData, setProximityData] = useState<ProximityInsights>({
    ports: [],
    airports: [],
    highways: [],
    key_location: [],
    major_tenants: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProximity = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>("http://localhost:5000/data/latest");
        
        if (!response.data?.proximityInsights) {
          throw new Error("Invalid data format received from server");
        }

        setProximityData(response.data.proximityInsights);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load proximity data";
        console.error("Failed to load proximity data:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProximity();
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-none border-t rounded-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Ruler className="h-5 w-5 mr-2" />
            Proximity Insights
          </CardTitle>
          <CardDescription>Distance to highways, ports, major tenants, and rail infrastructure</CardDescription>
        </CardHeader>
        <CardContent className=" p-0 sm:px-5">
          <Tabs defaultValue="highways" className="w-full max-w-7xl mx-auto">
            <TabsList className="flex justify-between items-center sm:grid w-full sm:grid-cols-5 mb-4">
              <TabsTrigger value="highways" className="text-[12px]">
                Highways
              </TabsTrigger>
              <TabsTrigger value="ports" className="text-[12px]">
                Ports
              </TabsTrigger>
              <TabsTrigger value="airports" className="text-[12px]">
                Airports
              </TabsTrigger>
              <TabsTrigger value="locations" className="text-[12px]">
                Key Locations
              </TabsTrigger>
              <TabsTrigger value="tenants" className="text-[12px]">
                Major Tenants
              </TabsTrigger>
            </TabsList>

            <TabsContent value="highways">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Road className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium">Highway Access Points</h3>
                </div>

                <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                  {proximityData?.highways?.length > 0 ? (
                    proximityData.highways.map((highway, index) => (
                      <AnimatedItem
                        key={highway}
                        index={index}
                        className="border rounded-md p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{highway.name}</div>
                          <div className="text-sm text-gray-500 border-4">Travel Time: {highway.travelTime || "N/A"}</div>
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="text-sm">
                            {highway.distance || "N/A"}
                          </Badge>
                        </motion.div>
                      </AnimatedItem>
                    ))
                  ) : (
                    <p>No Highway Data Available</p>
                  )}
                </AnimatedContainer>

                {proximityData?.highways?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Highway Access Insights</div>
                    <ul className="text-sm space-y-2">
                      {proximityData.highways.map(
                        (highway, index) =>
                          highway.description && (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>{highway.description || "N/A"}</span>
                            </li>
                          ),
                      )}
                      {proximityData.highways.length > 0 && !proximityData.highways.some((h) => h.description) && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Highway access information available</span>
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ports">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Anchor className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium">Port Facilities</h3>
                </div>

                <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                  {proximityData?.ports?.length > 0 ? (
                    proximityData.ports.map((port, index) => (
                      <AnimatedItem
                        key={index}
                        index={index}
                        className="border rounded-md p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{port.name || "N/A"}</div>
                          {port.insights && <div className="text-sm text-gray-600 mt-1">{port.description || "N/A"}</div>}
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="text-sm">
                            {port.distance || "N/A"}
                          </Badge>
                        </motion.div>
                      </AnimatedItem>
                    ))
                  ) : (
                    <p>No Port Data Available</p>
                  )}
                </AnimatedContainer>

                {proximityData?.ports?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Port Access Insights</div>
                    <ul className="text-sm space-y-2">
                      {proximityData.ports.map(
                        (port, index) =>
                          port.insights && (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>{port.insights}</span>
                            </li>
                          ),
                      )}
                    </ul>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="airports">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Train className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium">Airport Access</h3>
                </div>

                <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                  {proximityData?.airports?.length > 0 ? (
                    proximityData.airports.map((airport, index) => (
                      <AnimatedItem
                        key={index}
                        index={index}
                        className="border rounded-md p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{airport.name || "N/A"}</div>
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="text-sm">
                            {airport.distance || "N/A"}
                          </Badge>
                        </motion.div>
                      </AnimatedItem>
                    ))
                  ) : (
                    <p>No Airport Data Available</p>
                  )}
                </AnimatedContainer>

                {proximityData?.airports?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Airport Access Insights</div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>All three major NYC airports accessible</span>
                      </li>
                      {proximityData.airports.length > 0 && (
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>
                            {proximityData.airports[0].name} is accessible at {proximityData.airports[0].distance}
                          </span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Strategic location for air freight connections</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="locations">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium">Key Locations</h3>
                </div>

                <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                  {proximityData?.key_location?.length > 0 ? (
                    proximityData.key_location.map((location, index) => (
                      <AnimatedItem
                        key={index}
                        index={index}
                        className="border rounded-md p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{location.location || "N/A"}</div>
                          {location.time && <div className="text-sm text-gray-500">Travel Time: {location.time}</div>}
                          {location.insight && <div className="text-sm text-gray-600 mt-1">{location.insight}</div>}
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="text-sm">
                            {location.distance ? `${location.distance} miles` : "N/A"}
                          </Badge>
                        </motion.div>
                      </AnimatedItem>
                    ))
                  ) : (
                    <p>No Key Location Data Available</p>
                  )}
                </AnimatedContainer>

                {proximityData?.key_location?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Location Insights</div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>
                          Ideally located on Brooklyn&apos;s waterfront in the coveted Red Hook logistics submarket
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Minutes from Brooklyn&apos;s 2.8 million consumers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Direct access to Downtown Manhattan</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tenants">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium">Major Tenants in Vicinity</h3>
                </div>

                <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                  {proximityData?.major_tenants?.length > 0 ? (
                    proximityData.major_tenants.map((tenant, index) => (
                      <AnimatedItem
                        key={index}
                        index={index}
                        className="border rounded-md p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{tenant.name || "N/A"}</div>
                          <div className="text-sm text-gray-500">
                            {tenant.industry && `Industry: ${tenant.industry}`}
                            {tenant.travelTime && ` • Travel Time: ${tenant.travelTime}`}
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="text-sm">
                            {tenant.distance || "N/A"}
                          </Badge>
                        </motion.div>
                      </AnimatedItem>
                    ))
                  ) : (
                    <p>No Major Tenant Data Available</p>
                  )}
                </AnimatedContainer>

                {proximityData?.major_tenants?.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Tenant Ecosystem Insights</div>
                    <ul className="text-sm space-y-2">
                      {proximityData.major_tenants.map(
                        (tenant, index) =>
                          tenant.description && (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>{tenant.description}</span>
                            </li>
                          ),
                      )}
                      {proximityData.major_tenants.length > 0 &&
                        !proximityData.major_tenants.some((t) => t.description) && (
                          <>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>Strategic location near major business tenants</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <span>Logistics cluster forming with multiple facilities nearby</span>
                            </li>
                          </>
                        )}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-md mt-4"
                  >
                    <div className="text-sm font-medium mb-2">Tenant Ecosystem Insights</div>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>
                          Amazon has rapidly expanded its footprint in the boroughs to service its largest delivery
                          market
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Amazon occupies over 7.5 MSF of industrial space within the NY boroughs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>
                          Logistics cluster forming with multiple Amazon facilities and other logistics providers nearby
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Proximity

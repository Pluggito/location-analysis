"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, RouteIcon as Road, Train, Anchor, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"

export default function Proximity(){

    const proximityData = {
        highways: [
          { name: "Brooklyn Battery Tunnel", distance: "0.3 miles", travelTime: "< 5 min" },
          { name: "I-278 (Brooklyn-Queens Expressway)", distance: "0.5 miles", travelTime: "2 min" },
          { name: "I-478 (Brooklyn Battery Tunnel)", distance: "1.2 miles", travelTime: "5 min" },
        ],
        ports: [
          {
            name: "Red Hook Container Terminal",
            distance: "Adjacent",
            travelTime: "1 min",
            description: "65-acre full-service container port with over 2,000 feet of deep water berth",
          },
          { name: "Brooklyn Marine Terminal", distance: "1.5 miles", travelTime: "7 min" },
          { name: "Port Newark-Elizabeth", distance: "12.4 miles", travelTime: "25 min" },
        ],
        airports: [
          { name: "LaGuardia Airport", distance: "11 miles", travelTime: "40 min" },
          { name: "JFK Airport", distance: "20 miles", travelTime: "40 min" },
          { name: "Newark Airport", distance: "20 miles", travelTime: "40 min" },
        ],
        locations: [
          { name: "Downtown Brooklyn", distance: "4 miles", travelTime: "10 min" },
          { name: "Manhattan", distance: "4 miles", travelTime: "10 min" },
          { name: "Downtown Manhattan", distance: "< 5 miles", travelTime: "< 10 min" },
        ],
        tenants: [
          { name: "Amazon (640 Columbia St)", distance: "0.5 miles", travelTime: "2 min", industry: "E-commerce" },
          { name: "IKEA Brooklyn", distance: "1.1 miles", travelTime: "5 min", industry: "Retail" },
          { name: "Amazon Fresh (55 Bay St)", distance: "1.5 miles", travelTime: "6 min", industry: "E-commerce" },
          { name: "FedEx Ground", distance: "3.5 miles", travelTime: "12 min", industry: "Logistics" },
          { name: "UPS Customer Center", distance: "4.2 miles", travelTime: "15 min", industry: "Logistics" },
        ],
      }

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
                  <TabsTrigger value="highways" className="text-[12px]">Highways</TabsTrigger>
                  <TabsTrigger value="ports" className="text-[12px]">Ports</TabsTrigger>
                  <TabsTrigger value="airports" className="text-[12px]">Airports</TabsTrigger>
                  <TabsTrigger value="locations" className="text-[12px]">Key Locations</TabsTrigger>
                  <TabsTrigger value="tenants" className="text-[12px]">Major Tenants</TabsTrigger>
                </TabsList>
    
                <TabsContent value="highways">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Road className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-medium">Highway Access Points</h3>
                    </div>
    
                    <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                      {proximityData.highways.map((highway, index) => (
                        <AnimatedItem
                          key={index}
                          index={index}
                          className="border rounded-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{highway.name}</div>
                            <div className="text-sm text-gray-500">Travel Time: {highway.travelTime}</div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Badge variant="outline" className="text-sm">
                              {highway.distance}
                            </Badge>
                          </motion.div>
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="bg-gray-50 p-4 rounded-md mt-4"
                    >
                      <div className="text-sm font-medium mb-2">Highway Access Insights</div>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Excellent access to Brooklyn Battery Tunnel, providing direct routes to Manhattan</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Property is within 5 minutes of major highway interchange, ideal for distribution</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Direct access to I-278 for Brooklyn, Queens, and Staten Island deliveries</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </TabsContent>
    
                <TabsContent value="ports">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Anchor className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-medium">Port Facilities</h3>
                    </div>
    
                    <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                      {proximityData.ports.map((port, index) => (
                        <AnimatedItem
                          key={index}
                          index={index}
                          className="border rounded-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{port.name}</div>
                            <div className="text-sm text-gray-500">Travel Time: {port.travelTime}</div>
                            {port.description && <div className="text-sm text-gray-600 mt-1">{port.description}</div>}
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Badge variant="outline" className="text-sm">
                              {port.distance}
                            </Badge>
                          </motion.div>
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="bg-gray-50 p-4 rounded-md mt-4"
                    >
                      <div className="text-sm font-medium mb-2">Port Access Insights</div>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Property is adjacent to Red Hook Container Terminal, a key port facility</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Direct access to waterborne freight capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Port Newark-Elizabeth Marine Terminal accessible within 25 minutes</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </TabsContent>
    
                <TabsContent value="airports">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Train className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-medium">Airport Access</h3>
                    </div>
    
                    <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                      {proximityData.airports.map((airport, index) => (
                        <AnimatedItem
                          key={index}
                          index={index}
                          className="border rounded-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{airport.name}</div>
                            <div className="text-sm text-gray-500">Travel Time: {airport.travelTime}</div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Badge variant="outline" className="text-sm">
                              {airport.distance}
                            </Badge>
                          </motion.div>
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
    
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
                          <span>All three major NYC airports accessible within 40 minutes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>LaGuardia Airport is the closest at 11 miles</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Strategic location for air freight connections</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </TabsContent>
    
                <TabsContent value="locations">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-medium">Key Locations</h3>
                    </div>
    
                    <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                      {proximityData.locations.map((location, index) => (
                        <AnimatedItem
                          key={index}
                          index={index}
                          className="border rounded-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-gray-500">Travel Time: {location.travelTime}</div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Badge variant="outline" className="text-sm">
                              {location.distance}
                            </Badge>
                          </motion.div>
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
    
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
                          <span>Ideally located on Brooklyn&apos; waterfront in the coveted Red Hook logistics submarket</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Minutes from Brooklyn&apos; 2.8 million consumers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Direct access to Downtown Manhattan within 5 minutes</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </TabsContent>
    
                <TabsContent value="tenants">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-gray-600" />
                      <h3 className="font-medium">Major Tenants in Vicinity</h3>
                    </div>
    
                    <AnimatedContainer stagger={true} className="grid grid-cols-1 gap-3">
                      {proximityData.tenants.map((tenant, index) => (
                        <AnimatedItem
                          key={index}
                          index={index}
                          className="border rounded-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{tenant.name}</div>
                            <div className="text-sm text-gray-500">
                              Industry: {tenant.industry} • Travel Time: {tenant.travelTime}
                            </div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Badge variant="outline" className="text-sm">
                              {tenant.distance}
                            </Badge>
                          </motion.div>
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
    
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
                            Amazon has rapidly expanded its footprint in the boroughs to service its largest delivery market
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
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )
}




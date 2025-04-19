"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Clock, MapPin, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AnimatedContainer, AnimatedItem, AnimatedProgress } from "@/components/ui/animate"

export default function SupplyPipeline() {
  const developments = [
    {
      id: 1,
      name: "640 Columbia Street",
      address: "640 Columbia St, Brooklyn, NY",
      distance: "0.5 miles away",
      status: "Completed",
      completion: "Jun-22",
      progress: 100,
      size: "336,350 sqft",
      type: "Industrial/Logistics",
      developer: "CBRE",
      tenant: "Amazon",
      description: "Last-mile delivery station with 336,350 sqft of logistics space",
    },
    {
      id: 2,
      name: "12555 Flatlands",
      address: "12555 Flatlands Ave, Brooklyn, NY",
      distance: "4.2 miles away",
      status: "Completed",
      completion: "Jun-22",
      progress: 100,
      size: "211,000 sqft",
      type: "Industrial/Logistics",
      developer: "CBRE",
      tenant: "Amazon",
      description: "Last-mile delivery station serving Brooklyn's eastern neighborhoods",
    },
    {
      id: 3,
      name: "Terminal Logistics Center",
      address: "130 S Conduit Dr, Queens, NY",
      distance: "7.5 miles away",
      status: "Completed",
      completion: "Mar-23",
      progress: 100,
      size: "336,000 sqft",
      type: "Industrial/Logistics",
      developer: "Triangle Equities, Goldman",
      tenant: "Do & Co",
      description: "Modern logistics facility with airport proximity",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className=" shadow-none w-full rounded-none ">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Supply Pipeline
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Limited New Supply
            </Badge>
          </div>
          <CardDescription>Nearby developments, construction timelines, and property type mix</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <AnimatedContainer stagger={true} className="space-y-4">
                {developments.map((dev, index) => (
                  <AnimatedItem key={dev.id} index={index} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{dev.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {dev.address}
                          <span className="mx-1">•</span>
                          {dev.distance}
                        </div>
                      </div>
                      <Badge
                        variant={
                          dev.status === "Under Construction"
                            ? "default"
                            : dev.status === "Planned"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {dev.status}
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Completion: {dev.completion}</span>
                        <span className="font-medium">{dev.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <AnimatedProgress value={dev.progress} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <div className="text-gray-500">Size</div>
                        <div className="font-medium">{dev.size}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Property Type</div>
                        <div className="font-medium">{dev.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Developer/Owner</div>
                        <div className="font-medium">{dev.developer}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Tenant</div>
                        <div className="font-medium">{dev.tenant}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">{dev.description}</div>
                  </AnimatedItem>
                ))}
              </AnimatedContainer>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4"
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Suppressed Supply in Red Hook and Surrounding Boroughs
                    </h4>
                    <p className="mt-2 mb-3 text-sm text-amber-700">
                      Key factors that contribute to constrained logistics supply:
                    </p>
                    <AnimatedContainer stagger={true} className="mt-2 space-y-2 text-sm text-amber-700">
                      <AnimatedItem className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>Amazon last-mile use is exclusively permitted in M or C9 zones</span>
                      </AnimatedItem>
                      <AnimatedItem className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>
                          Brooklyn&apos; logistics inventory has declined by more than 6 MSF over the past decade due to
                          commercial/residential conversions
                        </span>
                      </AnimatedItem>
                      <AnimatedItem className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>Residential developers willing to pay 3X premium for land sites</span>
                      </AnimatedItem>
                      <AnimatedItem className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>
                          New industrial permit (May 2024) mandates last-mile facilities to apply for special permits
                          from the City Planning Commission, restricting future development
                        </span>
                      </AnimatedItem>
                      <AnimatedItem className="flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>
                          Uncertainty of approval will discourage speculative industrial development, causing an
                          increase in market rents and a decrease in vacancy rates
                        </span>
                      </AnimatedItem>
                    </AnimatedContainer>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="timeline">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Timeline visualization */}
                <div className="border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
                  {developments.map((dev, index) => (
                    <motion.div
                      key={dev.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <Clock className="h-3 w-3 text-gray-600" />
                      </div>
                      <div className="mb-1 flex items-baseline">
                        <span className="font-medium">{dev.completion}</span>
                        <span className="ml-2 text-sm text-gray-500">{dev.name}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{dev.address}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Badge
                          variant={
                            dev.status === "Under Construction"
                              ? "default"
                              : dev.status === "Planned"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs mr-2"
                        >
                          {dev.status}
                        </Badge>
                        <span>
                          {dev.size} • {dev.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4"
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Suppressed Supply in Red Hook and Surrounding Boroughs
                    </h4>
                    <p className="mt-2 text-sm text-amber-700">
                      Despite moderating leasing totals nationwide, the Brooklyn submarket surrounding 280 Richards
                      stands at approximately 5% vacancy. Borough average taking rents continue to exceed $40 PSF, which
                      includes Class A assets that are older and structurally inferior to 280 Richards. New York City
                      Boroughs posted year-to-date net absorption of 625,000 SF, with over 900,000 SF of Q1 2024 leasing
                      volume, which was over 70% higher than last year&apos; quarterly average.
                    </p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"


export default function ZonesOverlays(){

    const zoningDetails = {
        code: "M1-1",
        description: "Light Manufacturing District",
        allowedUses: ["Manufacturing", "Commercial", "Limited Community Facility", "Last-Mile Logistics"],
        restrictions: [
          "No residential use permitted",
          "Performance standards apply for noise, vibration, emissions",
          "Parking requirements based on use and floor area",
        ],
        buildingParameters: {
          maxFAR: "1.0 FAR (Manufacturing/Commercial)",
          height: "No fixed height limit, governed by sky exposure plane",
          setbacks: "Required above certain heights based on street width",
          parking: "1 space per 300 sq ft for manufacturing use",
        },
        specialDistricts: [
          {
            name: "Red Hook Industrial Business Zone",
            description:
              "Area designated for industrial and manufacturing uses with tax incentives and business support services",
            link: "https://edc.nyc/industry/industrial-and-manufacturing",
          },
        ],
        municipalReferences: [
          {
            name: "NYC Zoning Resolution",
            description: "Complete zoning text for M1 districts",
            link: "https://zr.planning.nyc.gov/article-iv/chapter-2",
          },
          {
            name: "NYC Zoning Maps",
            description: "Official zoning maps for Brooklyn",
            link: "https://zola.planning.nyc.gov/",
          },
          {
            name: "NYC Business Zone Boundary Tool",
            description: "Interactive map of business zones",
            link: "https://edc.nyc/business-programs",
          },
        ],
      }
    
    return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-none border-t rounded-none">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Zoning Overlays
                </CardTitle>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
                >
                  <Badge className="text-xs bg-black hover:bg-gray-800">{zoningDetails.code}</Badge>
                </motion.div>
              </div>
              <CardDescription>{zoningDetails.description} - Basic code and municipal references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3 className="text-sm font-medium mb-2">Allowed Uses</h3>
                    <AnimatedContainer stagger={true} className="space-y-1">
                      {zoningDetails.allowedUses.map((use, index) => (
                        <AnimatedItem key={index} index={index} className="flex items-center text-sm">
                          <span className="text-green-600 mr-2">•</span>
                          {use}
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h3 className="text-sm font-medium mb-2">Restrictions</h3>
                    <AnimatedContainer stagger={true} className="space-y-1">
                      {zoningDetails.restrictions.map((restriction, index) => (
                        <AnimatedItem key={index} index={index} className="flex items-center text-sm">
                          <span className="text-red-500 mr-2">•</span>
                          {restriction}
                        </AnimatedItem>
                      ))}
                    </AnimatedContainer>
                  </motion.div>
                </div>
    
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h3 className="text-sm font-medium mb-2">Building Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(zoningDetails.buildingParameters).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                        className="border rounded-md p-3"
                      >
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="font-medium text-sm">{value}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="special-districts">
                      <AccordionTrigger className="text-sm font-medium">Special Districts</AccordionTrigger>
                      <AccordionContent>
                        <AnimatedContainer stagger={true} className="space-y-3">
                          {zoningDetails.specialDistricts.map((district, index) => (
                            <AnimatedItem key={index} index={index} className="border rounded-md p-3 mb-3">
                              <div className="font-medium text-sm">{district.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{district.description}</div>
                              <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Details
                              </Button>
                            </AnimatedItem>
                          ))}
                        </AnimatedContainer>
                      </AccordionContent>
                    </AccordionItem>
    
                    <AccordionItem value="municipal-references">
                      <AccordionTrigger className="text-sm font-medium">Municipal References</AccordionTrigger>
                      <AccordionContent>
                        <AnimatedContainer stagger={true} className="space-y-3">
                          {zoningDetails.municipalReferences.map((reference, index) => (
                            <AnimatedItem key={index} index={index} className="border rounded-md p-3">
                              <div className="font-medium text-sm">{reference.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{reference.description}</div>
                              <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit Resource
                              </Button>
                            </AnimatedItem>
                          ))}
                        </AnimatedContainer>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-gray-50 p-4 rounded-md"
                >
                  <div className="text-sm font-medium mb-2">Zoning Insights</div>
                  <AnimatedContainer stagger={true} className="text-sm space-y-2">
                    <AnimatedItem className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Amazon last-mile use is exclusively permitted in M or C9 zones</span>
                    </AnimatedItem>
                    <AnimatedItem className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>
                        New industrial permit (May 2024) mandates last-mile facilities to apply for special permits from the
                        City Planning Commission
                      </span>
                    </AnimatedItem>
                    <AnimatedItem className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Uncertainty of approval will discourage speculative industrial development</span>
                    </AnimatedItem>
                    <AnimatedItem className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Supply constraints likely to increase market rents and decrease vacancy rates</span>
                    </AnimatedItem>
                  </AnimatedContainer>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }
  






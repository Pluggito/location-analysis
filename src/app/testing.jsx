"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"
import ZolaMap from "./zoning-map"



// Dummy data
const dummyZoningData = {
  code: ["M1-1", "C9-1", "R7A"],
  description: [
    "Light manufacturing district",
    "Commercial district with industrial uses",
    "Residential district with contextual regulations"
  ],
  municipal_reference: [
    "NYC Zoning Resolution Article IV, Chapter 1",
    "NYC Zoning Resolution Article V, Chapter 2",
    "NYC Zoning Resolution Article II, Chapter 3"
  ],
  link: [
    "https://www1.nyc.gov/site/planning/zoning/districts-tools/m1.page",
    "https://www1.nyc.gov/site/planning/zoning/districts-tools/c9.page",
    "https://www1.nyc.gov/site/planning/zoning/districts-tools/r7a.page"
  ]
};

export default function ZonesOverlays() {
  
  // Use dummy data directly
  const zoningData = dummyZoningData;

  const hasCode = Array.isArray(zoningData.code) && zoningData.code.length > 0;
  const hasDescription = Array.isArray(zoningData.description) && zoningData.description.length > 0;
  const hasMunicipalReference = Array.isArray(zoningData.municipal_reference) && zoningData.municipal_reference.length > 0;
  const hasLinks = Array.isArray(zoningData.link) && zoningData.link.length > 0;

  const codes = zoningData.code || [];
  const descriptions = zoningData.description || [];
  const municipalReferences = zoningData.municipal_reference || [];
  const links = zoningData.link || [];

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
            {/* add zoning map here */}
            
            {hasCode && codes[0] && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
              >
                <Badge className="text-xs bg-black hover:bg-gray-800">
                  {codes[0]}
                </Badge>
              </motion.div>
            )}
          </div>
          <CardDescription>
            {hasDescription ? descriptions[0] : 'No description available'} - Basic code and municipal references
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div>
             <ZolaMap/>
            </div>
             
          <div>
            Zone A
          </div>
          </div>
          
          
         {/* <div className="space-y-6 max-w-7xl mx-auto">
            {hasCode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-sm font-medium mb-2">Allowed Uses</h3>
                  <AnimatedContainer stagger={true} className="space-y-1">
                    {codes.map((use, index) => (
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
                    {codes.map((restriction, index) => (
                      <AnimatedItem key={index} index={index} className="flex items-center text-sm">
                        <span className="text-red-500 mr-2">•</span>
                        {restriction}
                      </AnimatedItem>
                    ))}
                  </AnimatedContainer>
                </motion.div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-sm font-medium mb-2">Building Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                {codes.map((code, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                    className="border rounded-md p-3"
                  >
                    <div className="text-xs text-gray-500">Parameter {index + 1}</div>
                    <div className="font-medium text-[11px] sm:text-sm">{code}</div>
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
                {hasCode && (
                  <AccordionItem value="special-districts">
                    <AccordionTrigger className="text-sm font-medium">Special Districts</AccordionTrigger>
                    <AccordionContent>
                      <AnimatedContainer stagger={true} className="space-y-3">
                        {codes.map((district, index) => (
                          <AnimatedItem key={index} index={index} className="border rounded-md p-3 mb-3">
                            <div className="font-medium text-sm">{district}</div>
                            <div className="text-sm text-gray-600 mt-1">{district}</div>
                            <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-xs">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </AnimatedItem>
                        ))}
                      </AnimatedContainer>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {hasMunicipalReference && (
                  <AccordionItem value="municipal-references">
                    <AccordionTrigger className="text-sm font-medium">Municipal References</AccordionTrigger>
                    <AccordionContent>
                      <AnimatedContainer stagger={true} className="space-y-3">
                        {municipalReferences.map((reference, index) => (
                          <AnimatedItem key={index} index={index} className="border rounded-md p-3">
                            <div className="font-medium text-sm">{reference}</div>
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto mt-2 text-xs"
                              onClick={() => hasLinks ? window.open(links[index], '_blank') : null}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Resource
                            </Button>
                          </AnimatedItem>
                        ))}
                      </AnimatedContainer>
                    </AccordionContent>
                  </AccordionItem>
                )}
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
          </div>*/}
        </CardContent>
      </Card>
    </motion.div>
  );
}

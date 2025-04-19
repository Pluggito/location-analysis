"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"
import { motion } from "framer-motion"

const comparables = [
    {
      id: 1,
      address: "Rock Lake Business Center",
      submarket: "South Florida (FL)",
      date: "Jun-24",
      price: "$100,500,000",
      pricePSF: "$392",
      size: "256,436 sqft",
      zoning: "Commercial",
      capRate: "4.9%",
      seller: "Ivanhoe Cambridge, Oxford Properties",
      buyer: "Tishman Speyer",
      tenant: "Amazon",
    },
    {
      id: 2,
      address: "1 Debaun Rd",
      submarket: "Exit 8A (NJ)",
      date: "Jun-24",
      price: "$41,903,580",
      pricePSF: "$315",
      size: "132,930 sqft",
      zoning: "Industrial",
      capRate: "5.0%",
      seller: "Scannell Properties",
      buyer: "Cabot",
      tenant: "Berry Plastics",
    },
    {
      id: 3,
      address: "Baylis 495 Business Park",
      submarket: "Long Island",
      date: "May-24",
      price: "$44,000,000",
      pricePSF: "$425",
      size: "103,500 sqft",
      zoning: "Commercial",
      capRate: "5.1%",
      seller: "Creation Equity, JPM",
      buyer: "Bentall Green Oak",
      tenant: "Keurig Dr. Pepper",
    },
    {
      id: 4,
      address: "Blackstone Portfolio",
      submarket: "National (CA, NY, NJ)",
      date: "May-24",
      price: "$364,500,000",
      pricePSF: "$296",
      size: "1,233,140 sqft",
      zoning: "Various",
      capRate: "4.3%",
      seller: "Blackstone",
      buyer: "Terreno Realty",
      tenant: "Various",
    },
    {
      id: 5,
      address: "Bridgepoint Maspeth (58 Maurice Ave)",
      submarket: "Queens",
      date: "Dec-23",
      price: "$57,000,000",
      pricePSF: "$447",
      size: "127,587 sqft",
      zoning: "Industrial",
      capRate: "3.3%",
      seller: "Turnbridge Equities",
      buyer: "BRIDGE",
      tenant: "FedEx",
    },
    {
      id: 6,
      address: "Northern NJ Core Industrial Portfolio",
      submarket: "Fairfield (NJ)",
      date: "Nov-23",
      price: "$116,500,000",
      pricePSF: "$288",
      size: "404,713 sqft",
      zoning: "Industrial",
      capRate: "4.6%",
      seller: "Link Logistics, Hampshire",
      buyer: "TA Realty",
      tenant: "DHL",
    },
    {
      id: 7,
      address: "19 Ridgeboro Rd",
      submarket: "Exit 8A (NJ)",
      date: "Oct-23",
      price: "$165,776,520",
      pricePSF: "$323",
      size: "513,240 sqft",
      zoning: "Industrial",
      capRate: "5.1%",
      seller: "IDI Logistics, Oxford Properties",
      buyer: "Blackstone",
      tenant: "FedEx",
    },
    {
      id: 8,
      address: "Terminal Logistics Center (130 S Conduit Dr)",
      submarket: "Queens",
      date: "Mar-23",
      price: "$136,000,000",
      pricePSF: "$405",
      size: "336,000 sqft",
      zoning: "M1-1",
      capRate: "4.4%",
      seller: "L&B Realty Advisors",
      buyer: "Triangle Equities, Goldman",
      tenant: "Do & Co",
    },
    {
      id: 9,
      address: "640 Columbia Street",
      submarket: "Brooklyn",
      date: "Jun-22",
      price: "$330,000,000",
      pricePSF: "$981",
      size: "336,350 sqft",
      zoning: "M1-1",
      capRate: "3.5%",
      seller: "DH Property Holdings, Goldman",
      buyer: "CBREI",
      tenant: "Amazon",
    },
    {
      id: 10,
      address: "12555 Flatlands",
      submarket: "Brooklyn",
      date: "Jun-22",
      price: "$230,000,000",
      pricePSF: "$1,090",
      size: "211,000 sqft",
      zoning: "M1-1",
      capRate: "3.5%",
      seller: "Amstar, Wildflower",
      buyer: "CBREI",
      tenant: "Amazon",
    },
    {
      id: 11,
      address: "WB Mason (1160 Commerce Ave)",
      submarket: "Bronx",
      date: "Apr-22",
      price: "$75,750,000",
      pricePSF: "$505",
      size: "150,000 sqft",
      zoning: "Industrial",
      capRate: "3.0%",
      seller: "Bradford Swett & Assocs",
      buyer: "Link Logistics",
      tenant: "WB Mason",
    },
    {
      id: 12,
      address: "Amazon Middlesex",
      submarket: "I-287 (NJ)",
      date: "Jan-22",
      price: "$131,000,000",
      pricePSF: "$328",
      size: "400,000 sqft",
      zoning: "Industrial",
      capRate: "2.9%",
      seller: "Rockefeller Group",
      buyer: "CBREI",
      tenant: "Amazon",
    },
  ]

export default function SalesComparables() {
  const [showAllRows, setShowAllRows] = useState(false)
  const initialRowsToShow = 5

  // Determine which rows to display based on showAllRows state
  const displayedComparables = showAllRows ? comparables : comparables.slice(0, initialRowsToShow)

  const toggleShowMore = () => {
    setShowAllRows(!showAllRows)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-none border-t rounded-none">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Land Sale Comparables
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {comparables.length} Recent Sales
          </Badge>
        </div>
        <CardDescription>Recent land sales with price per square foot, zoning, and size details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="grid" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:flex lg:justify-center lg:items-center mb-4">
            <TabsTrigger value="grid" className="lg:hidden">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="lg:hidden">
          <AnimatedContainer stagger={true} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedComparables.map((comp) => (
                <AnimatedItem key={comp.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{comp.address}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {comp.submarket}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{comp.date}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <div className="text-gray-500">Price</div>
                      <div className="font-medium">{comp.price}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Price PSF</div>
                      <div className="font-medium">{comp.pricePSF}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Size</div>
                      <div className="font-medium">{comp.size}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Cap Rate</div>
                      <div className="font-medium">{comp.capRate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Zoning</div>
                      <div className="font-medium">{comp.zoning}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tenant</div>
                      <div className="font-medium">{comp.tenant}</div>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
              

              {comparables.length > initialRowsToShow && (
                <div className="col-span-full mt-4">
                  <Button variant="ghost" className="w-full flex items-center justify-center" onClick={toggleShowMore}>
                    {showAllRows ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See More <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </AnimatedContainer>
          </TabsContent>
          <TabsContent value="table">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto"
              >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 px-3 font-medium text-sm">Address</th>
                    <th className="py-2 px-3 font-medium text-sm">Submarket</th>
                    <th className="py-2 px-3 font-medium text-sm">Date</th>
                    <th className="py-2 px-3 font-medium text-sm">Price</th>
                    <th className="py-2 px-3 font-medium text-sm">Price PSF</th>
                    <th className="py-2 px-3 font-medium text-sm">Size</th>
                    <th className="py-2 px-3 font-medium text-sm">Cap Rate</th>
                    <th className="py-2 px-3 font-medium text-sm">Zoning</th>
                    <th className="py-2 px-3 font-medium text-sm">Tenant</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedComparables.map((comp, index) => (
                    <motion.tr key={comp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 text-sm">{comp.address}</td>
                      <td className="py-2 px-3 text-sm">{comp.submarket}</td>
                      <td className="py-2 px-3 text-sm">{comp.date}</td>
                      <td className="py-2 px-3 text-sm">{comp.price}</td>
                      <td className="py-2 px-3 text-sm">{comp.pricePSF}</td>
                      <td className="py-2 px-3 text-sm">{comp.size}</td>
                      <td className="py-2 px-3 text-sm">{comp.capRate}</td>
                      <td className="py-2 px-3 text-sm">{comp.zoning}</td>
                      <td className="py-2 px-3 text-sm">{comp.tenant}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {comparables.length > initialRowsToShow && (
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="flex items-center justify-center mx-auto" onClick={toggleShowMore}>
                    {showAllRows ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See More <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </motion.div>
    
  )
}




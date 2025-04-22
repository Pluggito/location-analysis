"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animate"
import { motion } from "framer-motion"
import axios from "axios"

interface RecentSale {
  address: string;
  price: number;
  date: string;
  size: number;
  buyers: string;
  price_psf: number;
  submarket: string;
  cap_rate: string;
  tenant: string;
}

interface LandSaleComparables {
  price_per_sqft: number;
  zoning: string;
  parcel_size: string[];
  recent_sales: RecentSale[];
}

interface ApiResponse {
  landSaleComparables: LandSaleComparables;
  success?: boolean;
  error?: string;
}

interface SalesComparablesProps {
  setLoading: (value: boolean) => void;
  loading: boolean;
}

const SalesComparables: React.FC<SalesComparablesProps> = ({ loading, setLoading }) => {
  const [showAllRows, setShowAllRows] = useState(false);
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const initialRowsToShow = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>("http://localhost:5000/data/latest");

        if (!response.data?.landSaleComparables?.recent_sales) {
          throw new Error("Invalid data format received from server");
        }

        setRecentSales(response.data.landSaleComparables.recent_sales);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load sales data";
        console.error("Error fetching sales comparables data:", errorMessage);
        setError(errorMessage);
        setRecentSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const formatCurrency = (value: number | undefined): string => {
    if (!value) return "N/A";
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(value);
  };

  const formatSize = (sqft: number | undefined): string => {
    if (!sqft) return "N/A";
    return new Intl.NumberFormat().format(sqft) + ' sqft';
  };

  const toggleShowMore = () => setShowAllRows(!showAllRows)

  if (error) {
    return (
      <Card className="shadow-none w-full rounded-none">
        <CardContent className="p-6">
          <div className="text-red-500">Error loading sales data: {error}</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate displayed sales based on showAllRows state
  const displayedSales = showAllRows ? recentSales : recentSales.slice(0, initialRowsToShow);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-none w-full rounded-none">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Land Sale Comparables
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {recentSales.length} Recent Sales
            </Badge>
          </div>
          <CardDescription>Recent land sales with price per square foot, zoning, and size details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <AnimatedContainer stagger={true} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recentSales.length > 0 ? (
                  displayedSales.map((sale, index) => (
                    <AnimatedItem 
                      key={sale.address || index} 
                      index={index} 
                      className="border rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{sale.address || "N/A"}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {sale.submarket || "N/A"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-medium">{sale.date || "N/A"}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <div className="text-gray-500">Price</div>
                          <div className="font-medium">{formatCurrency(sale.price)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Price PSF</div>
                          <div className="font-medium">${sale.price_psf || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Size</div>
                          <div className="font-medium">{formatSize(sale.size)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Cap Rate</div>
                          <div className="font-medium">{sale.cap_rate || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Zoning</div>
                          <div className="font-medium">{sale.zoning || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Tenant</div>
                          <div className="font-medium">{sale.tenant || "N/A"}</div>
                        </div>
                      </div>
                    </AnimatedItem>
                  ))
                ) : (
                  <div className="col-span-full">
                    <p>No sales comparables available.</p>
                  </div>
                )}
              </AnimatedContainer>

              {recentSales.length > initialRowsToShow && (
                <div className="col-span-full mt-4">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center"
                    onClick={toggleShowMore}
                  >
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
            </TabsContent>

            <TabsContent value="table">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Address</th>
                      <th className="p-2 border">Submarket</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Price PSF</th>
                      <th className="p-2 border">Size</th>
                      <th className="p-2 border">Cap Rate</th>
                      <th className="p-2 border">Zoning</th>
                      <th className="p-2 border">Tenant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedSales.length > 0 ? (
                      displayedSales.map((sale, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-2 border">{sale.address || "N/A"}</td>
                          <td className="p-2 border">{sale.submarket || "N/A"}</td>
                          <td className="p-2 border">{sale.date || "N/A"}</td>
                          <td className="p-2 border">{formatCurrency(sale.price)}</td>
                          <td className="p-2 border">${sale.price_psf || "N/A"}</td> 
                          <td className="p-2 border">{formatSize(sale.size)}</td>
                          <td className="p-2 border">{sale.cap_rate || "N/A"}</td>
                          <td className="p-2 border">{sale.zoning || "N/A"}</td>
                          <td className="p-2 border">{sale.tenant || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-4 text-center">
                          No sales comparables available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {recentSales.length > initialRowsToShow && (
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-center"
                      onClick={toggleShowMore}
                    >
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

export default SalesComparables

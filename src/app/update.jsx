{comparables?.recent_sales?.length > 0 ? ( comparables.recent_sales.map((comp) => (
    <AnimatedItem key={comp} className="border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{comp.address || "N/A"}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {comp.submarket || "N/A"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Date</div>
          <div className="font-medium">{comp.date || "N/A"}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <div className="text-gray-500">Price</div>
          <div className="font-medium">{comp.price || "N/A"}</div>
        </div>
        <div>
          <div className="text-gray-500">Price PSF</div>
          <div className="font-medium">{comp.pricePSF || "N/A"}</div>
        </div>
        <div>
          <div className="text-gray-500">Size</div>
          <div className="font-medium">{comp.size || "N/A"}</div>
        </div>
        <div>
          <div className="text-gray-500">Cap Rate</div>
          <div className="font-medium">{comp.capRate || "N/A" }</div>
        </div>
        <div>
          <div className="text-gray-500">Zoning</div>
          <div className="font-medium">{comp.zoning || "N/A"}</div>
        </div>
        <div>
          <div className="text-gray-500">Tenant</div>
          <div className="font-medium">{comp.tenant || "N/A"}</div>
        </div>
      </div>
    </AnimatedItem>
  ))): (
    <p>No construction timelines available.</p>
  )}

  if (
    response.data &&
    response.data.land_sales_comparables &&
    Array.isArray(response.data.land_sales_comparables.recent_sales)
  ) {
    salesData = response.data.land_sales_comparables.recent_sales
    console.log("Found recent_sales in land_sales_comparables:", salesData)
  } else if (
    response.data &&
    response.data.land_sale_comparables &&
    Array.isArray(response.data.land_sale_comparables.recent_sales)
  ) {
    salesData = response.data.land_sale_comparables.recent_sales
    console.log("Found recent_sales in land_sale_comparables:", salesData)
  } else if (response.data && Array.isArray(response.data.recent_sales)) {
    salesData = response.data.recent_sales
    console.log("Found recent_sales at top level:", salesData)
  } else if (response.data && Array.isArray(response.data)) {
    // If the response itself is an array, assume it's the sales data
    salesData = response.data
    console.log("Using entire response array as sales data:", salesData)
  }


  "use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, DollarSign } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import axios from "axios"

// Sample data for charts


interface DemographicsProps {
  loading?: boolean
  setLoading?: (value: boolean) => void
}

export default function Demographics({ loading, setLoading }: DemographicsProps) {
  const [demographicData, setDemographicData] = useState<any>({})

  useEffect(() => {
    const fetchDemographicData = async () => {
      if (setLoading) setLoading(true)
      try {
        const response = await axios.get("http://localhost:5000/data/latest")
        console.log("Raw API response:", response.data)

        setDemographicData(response.data.demographicTrends)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        if (setLoading) setLoading(false)
      }
    }

    fetchDemographicData()
  }, [setLoading])


  return (
    <Card className="shadow-none border-t rounded-none mt-5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Demographic Trends
        </CardTitle>
        <CardDescription>Population growth, income trends, and workforce composition</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="population" className="w-full">
          <TabsList className="flex justify-between items-center sm:grid w-full sm:grid-cols-3 mb-4 ">
            <TabsTrigger value="population">Population</TabsTrigger>
            <TabsTrigger value="income">Income Growth</TabsTrigger>
            <TabsTrigger value="spending">Consumer Spending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="population">
            <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                {demographicData?.population_growth?.length > 0 ? (
                   demographicData.population.map((pop)=>(
                    <div>
                  <h3 className="font-medium">Population Trends</h3>
                  <p className="text-sm text-gray-500">
                  {pop.name}
                  </p>
                </div>
                   ))

                ): ()}
                <div className="text-right">
                  <div className="text-sm font-medium">Brooklyn Population</div>
                  <div className="text-lg font-bold text-green-600">2.8M</div>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={populationData.name} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBrooklyn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorQueens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorManhattan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()}`, "Population"]} />
                    <Area
                      type="monotone"
                      dataKey="Brooklyn"
                      stroke="#0ea5e9"
                      fillOpacity={1}
                      fill="url(#colorBrooklyn)"
                    />
                    <Area type="monotone" dataKey="Queens" stroke="#6366f1" fillOpacity={1} fill="url(#colorQueens)" />
                    <Area
                      type="monotone"
                      dataKey="Manhattan"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorManhattan)"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Brooklyn</div>
                  <div className="text-lg font-bold">2.8M</div>
                  <div className="text-xs text-green-600">31% of NYC population</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Queens</div>
                  <div className="text-lg font-bold">2.4M</div>
                  <div className="text-xs text-green-600">27% of NYC population</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Manhattan</div>
                  <div className="text-lg font-bold">1.7M</div>
                  <div className="text-xs text-green-600">19% of NYC population</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income">
            <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Median Household Income</h3>
                  <p className="text-sm text-gray-500">
                    {getDemographicValue("demographicTrends.income") ||
                      "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Red Hook Area Income</div>
                  <div className="text-lg font-bold text-green-600">$160,000</div>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Median Income"]} />
                    <Line
                      type="monotone"
                      dataKey="Brooklyn"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Queens"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Manhattan"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Brooklyn</div>
                  <div className="text-lg font-bold">$75,000</div>
                  <div className="text-xs text-green-600">+28.4% (5yr)</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Queens</div>
                  <div className="text-lg font-bold">$82,000</div>
                  <div className="text-xs text-green-600">+19.4% (5yr)</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Manhattan</div>
                  <div className="text-lg font-bold">$105,000</div>
                  <div className="text-xs text-green-600">+19.5% (5yr)</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spending">
            <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Consumer Spending Power</h3>
                  <p className="text-sm text-gray-500">
                    {getDemographicValue("demographicTrends.spending") ||
                      "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">10-Mile Radius Spending Power</div>
                  <div className="text-lg font-bold text-green-600">$75+ Billion</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Annual Spending"]} />
                      <Bar dataKey="amount" fill="#0ea5e9" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">Key Consumer Insights</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                        <span>Average Annual Household Spending</span>
                      </div>
                      <span className="font-medium">$30,000+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                        <span>Aggregate Spending Power (10-mile radius)</span>
                      </div>
                      <span className="font-medium">$75+ Billion</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-green-500 mr-2" />
                        <span>Projected Households by 2028 (10-mile radius)</span>
                      </div>
                      <span className="font-medium">2.5+ Million</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm font-medium mb-2">Consumer Trends</div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>E-commerce sales still only ~15% of total retail sales (Q1 2024)</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>Increased consumer reliance on e-commerce driving demand</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>Amazon maintains #1 market share of e-commerce gross sales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

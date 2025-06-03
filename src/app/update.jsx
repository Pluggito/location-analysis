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

interface PopulationGrowth {
  insights: string;
  description: string;
  year: string;
  capital: string;
  population: number;
  state: string;
}

interface IncomeData {
  insights: string;
  description: string;
  income: number;
  year: string;
}

interface SpendingData {
  insights: string;
  description: string;
  amount: number;
  category: string;
}

interface DemographicTrends {
  population_growth: PopulationGrowth[];
  income: IncomeData[];
  spending: SpendingData[];
}

interface ApiResponse {
  demographicTrends: DemographicTrends;
  success?: boolean;
  error?: string;
}

interface DemographicsProps {
  loading?: boolean;
  setLoading?: (value: boolean) => void;
}

// Add default data structures for empty states
const defaultPopulationData = [
  { year: '2020', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2021', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2022', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2023', Brooklyn: 0, Queens: 0, Manhattan: 0 }
];

const defaultIncomeData = [
  { year: '2020', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2021', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2022', Brooklyn: 0, Queens: 0, Manhattan: 0 },
  { year: '2023', Brooklyn: 0, Queens: 0, Manhattan: 0 }
];

const defaultSpendingData = [
  { category: 'Retail', amount: 0 },
  { category: 'Food', amount: 0 },
  { category: 'Entertainment', amount: 0 },
  { category: 'Transportation', amount: 0 }
];

export default function Demographics({ loading, setLoading }: DemographicsProps) {
  const [demographicData, setDemographicData] = useState<DemographicTrends | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState({
    population: defaultPopulationData,
    income: defaultIncomeData,
    spending: defaultSpendingData
  });

  useEffect(() => {
    const fetchDemographicData = async () => {
      if (setLoading) setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/data/latest`);
        
        if (!response.data?.demographicTrends) {
          throw new Error("Invalid data format received from server");
        }

        setDemographicData(response.data.demographicTrends);

        // Transform the data for charts if available
        if (response.data.demographicTrends.population_growth) {
          const populationData = response.data.demographicTrends.population_growth.map(item => ({
            year: item.year,
            Brooklyn: item.population || 0,
            Queens: item.population || 0,
            Manhattan: item.population || 0
          }));
          setChartData(prev => ({ ...prev, population: populationData }));
        }

        if (response.data.demographicTrends.income) {
          const incomeData = response.data.demographicTrends.income.map(item => ({
            year: item.year || new Date().getFullYear().toString(),
            Brooklyn: item.income || 0,
            Queens: item.income || 0,
            Manhattan: item.income || 0
          }));
          setChartData(prev => ({ ...prev, income: incomeData }));
        }

        if (response.data.demographicTrends.spending) {
          const spendingData = response.data.demographicTrends.spending.map(item => ({
            category: item.category || 'Other',
            amount: item.amount || 0
          }));
          setChartData(prev => ({ ...prev, spending: spendingData }));
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load demographic data";
        console.error("Failed to load data:", error);
        setError(errorMessage);
        // Reset to default data on error
        setChartData({
          population: defaultPopulationData,
          income: defaultIncomeData,
          spending: defaultSpendingData
        });
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    fetchDemographicData();
  }, [setLoading]);

  const populationContent = demographicData?.population_growth?.map((item, index) => (
    <div key={index} className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">Population Trends</h3>
        <p className="text-sm text-gray-500">{item.insights}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{item.state} Population</div>
        <div className="text-lg font-bold text-green-600">
          {(item.population / 1000000).toFixed(1)}M
        </div>
      </div>
    </div>
  ));

  const incomeContent = demographicData?.income?.map((item, index) => (
    <div key={index} className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">Income Insights</h3>
        <p className="text-sm text-gray-500">{item.insights}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">Median Income</div>
        <div className="text-lg font-bold text-green-600">
          ${item.income.toLocaleString()}
        </div>
      </div>
    </div>
  ));

  const spendingContent = demographicData?.spending?.map((item, index) => (
    <div key={index} className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">Consumer Spending</h3>
        <p className="text-sm text-gray-500">{item.insights}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">Average Spending</div>
        <div className="text-lg font-bold text-green-600">
          ${item.amount.toLocaleString()}
        </div>
      </div>
    </div>
  ));

  if (error) {
    return (
      <Card className="shadow-none border-t rounded-none mt-5">
        <CardContent className="p-6">
          <div className="text-red-500">Error loading demographic data: {error}</div>
        </CardContent>
      </Card>
    );
  }

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
              {demographicData?.population_growth ? (
                populationContent
              ) : (
                <div className="text-sm text-gray-500">No population data available</div>
              )}
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={chartData.population} 
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income">
            <div className="space-y-4 max-w-7xl mx-auto">
              {demographicData?.income ? (
                incomeContent
              ) : (
                <div className="text-sm text-gray-500">No income data available</div>
              )}
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={chartData.income} 
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
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
              {demographicData?.spending ? (
                spendingContent
              ) : (
                <div className="text-sm text-gray-500">No spending data available</div>
              )}
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData.spending} 
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}



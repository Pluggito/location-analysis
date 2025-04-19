"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingUp, DollarSign } from "lucide-react";
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
} from "recharts";

const populationData = [
  { year: 2019, Brooklyn: 2589974, Queens: 2287506, Manhattan: 1632480 },
  { year: 2020, Brooklyn: 2576771, Queens: 2271911, Manhattan: 1585873 },
  { year: 2021, Brooklyn: 2641052, Queens: 2331143, Manhattan: 1694251 },
  { year: 2022, Brooklyn: 2590516, Queens: 2278029, Manhattan: 1629153 },
  { year: 2023, Brooklyn: 2641052, Queens: 2331143, Manhattan: 1694251 },
  { year: 2024, Brooklyn: 2800000, Queens: 2400000, Manhattan: 1700000 },
];

const incomeData = [
  { year: 2019, Brooklyn: 58431, Queens: 68666, Manhattan: 87855 },
  { year: 2020, Brooklyn: 60231, Queens: 70132, Manhattan: 86553 },
  { year: 2021, Brooklyn: 63829, Queens: 72560, Manhattan: 93651 },
  { year: 2022, Brooklyn: 67102, Queens: 75890, Manhattan: 96420 },
  { year: 2023, Brooklyn: 70912, Queens: 78560, Manhattan: 101230 },
  { year: 2024, Brooklyn: 75000, Queens: 82000, Manhattan: 105000 },
];

const spendingData = [
  { category: "Housing", amount: 12500 },
  { category: "Transportation", amount: 5200 },
  { category: "Food", amount: 4800 },
  { category: "Healthcare", amount: 3200 },
  { category: "Entertainment", amount: 2500 },
  { category: "Other", amount: 1800 },
];

export default function Demographics() {
  return (
    <Card className="shadow-none border-t rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Demographic Trends
        </CardTitle>
        <CardDescription>
          Population growth, income trends, and workforce composition
        </CardDescription>
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
                <div>
                  <h3 className="font-medium">Population Trends</h3>
                  <p className="text-sm text-gray-500">
                    Brooklyn houses over 2.8 million residents (31% of NYC&pos;
                    total population)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Brooklyn Population</div>
                  <div className="text-lg font-bold text-green-600">2.8M</div>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={populationData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorBrooklyn"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorQueens"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366f1"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366f1"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorManhattan"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(1)}M`
                      }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value) => [
                        `${value.toLocaleString()}`,
                        "Population",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="Brooklyn"
                      stroke="#0ea5e9"
                      fillOpacity={1}
                      fill="url(#colorBrooklyn)"
                    />
                    <Area
                      type="monotone"
                      dataKey="Queens"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorQueens)"
                    />
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
                  <div className="text-xs text-green-600">
                    31% of NYC population
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Queens</div>
                  <div className="text-lg font-bold">2.4M</div>
                  <div className="text-xs text-green-600">
                    27% of NYC population
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">Manhattan</div>
                  <div className="text-lg font-bold">1.7M</div>
                  <div className="text-xs text-green-600">
                    19% of NYC population
                  </div>
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
                    Average household income within a two-mile radius is
                    approximately $160,000
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Red Hook Area Income
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    $160,000
                  </div>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={incomeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Median Income",
                      ]}
                    />
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
                    Annual household spending averages over $30,000
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    10-Mile Radius Spending Power
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    $75+ Billion
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={spendingData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="category" />
                      <YAxis
                        tickFormatter={(value) =>
                          `$${(value / 1000).toFixed(0)}k`
                        }
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Annual Spending",
                        ]}
                      />
                      <Bar dataKey="amount" fill="#0ea5e9" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">
                    Key Consumer Insights
                  </div>
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
                        <span>
                          Projected Households by 2028 (10-mile radius)
                        </span>
                      </div>
                      <span className="font-medium">2.5+ Million</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm font-medium mb-2">
                      Consumer Trends
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>
                          E-commerce sales still only ~15% of total retail sales
                          (Q1 2024)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>
                          Increased consumer reliance on e-commerce driving
                          demand
                        </span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        <span>
                          Amazon maintains #1 market share of e-commerce gross
                          sales
                        </span>
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
  );
}

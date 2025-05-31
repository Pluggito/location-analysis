"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

interface DemographicsProps {
  loading?: boolean;
  setLoading?: (value: boolean) => void;
}

//Got estimates from chatgpt
const chartSpendingData = [
  { category: "Retail", amount: 9_000 },
  { category: "Food", amount: 11_288 },
  { category: "Entertainment", amount: 3_635 },
  { category: "Transportation", amount: 12_836 },
];

const counties = {
  Brooklyn: "047",
  Manhattan: "061",
  Bronx: "005",
  Queens: "081",
};

const years = [2021, 2022, 2023];

// Define the expected API response type
interface ApiResponse {
  demographicTrends: DemographicTrends;
}

export default function Demographics({
  loading,
  setLoading,
}: DemographicsProps) {
  const [demographicData, setDemographicData] =
    useState<DemographicTrends | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState({
    spending: chartSpendingData,
  });

  const [populationData, setPopulationData] = useState<
    Record<string, Record<string, number>>
  >({});
  const [householdIncome, setHouseholdIncome] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    const fetchDemographicData = async () => {
      if (setLoading) setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/source/latest`
        );

        if (!response.data?.demographicTrends) {
          throw new Error("Invalid data format received from server");
        }

        setDemographicData(response.data.demographicTrends);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load demographic data";
        console.error("Failed to load data:", error);
        setError(errorMessage);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    fetchDemographicData();
  }, [setLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const results: Record<string, Record<string, number>> = {};
      for (const year of years) {
        results[year] = {};
        for (const [borough, code] of Object.entries(counties)) {
          try {
            const response = await axios.get(
              `https://api.census.gov/data/${year}/acs/acs1?get=B01003_001E&for=county:${code}&in=state:36`
            );

            const [, valueRow] = response.data;
            const population = parseInt(valueRow[0]);
            results[year][borough] = population;
          } catch (error) {
            console.error(
              `Error fetching data for ${borough} in ${year}:`,
              error
            );
          }
        }
      }

      results["2024"] = {
        Brooklyn: 2800000,
        Manhattan: 1650000,
        Bronx: 1450000,
        Queens: 2250000,
      };

      setPopulationData(results);
    };

    fetchData();
  }, []);

  const data = Object.entries(populationData).map(([year, boroughs]) => ({
    year,
    ...boroughs,
  }));

  useEffect(() => {
    const fetchIncomeData = async () => {
      const results: Record<string, Record<string, number>> = {};

      for (const year of years) {
        results[year] = {};

        for (const [borough, code] of Object.entries(counties)) {
          try {
            const response = await axios.get(
              `https://api.census.gov/data/${year}/acs/acs1?get=B19013_001E&for=county:${code}&in=state:36`
            );

            const data = response.data;
            if (data.length > 1 && data[1][0] !== null) {
              const income = Number(data[1][0]);
              results[year][borough] = income;
            } else {
              results[year][borough] = 0;
            }
          } catch (err) {
            console.error(
              `Error fetching income for ${borough} in ${year}`,
              err
            );
            results[year][borough] = 0;
          }
        }
      }

      // Add 2024 manually
      results["2024"] = {
        Brooklyn: 70000,
        Manhattan: 95000,
        Bronx: 45000,
        Queens: 82000,
      };
      setHouseholdIncome(results);
    };

    fetchIncomeData();
  }, []);

  //console log the data for debugging purposes
  useEffect(() => {
    console.log("Income Data:", householdIncome);
  }, [householdIncome]);

  const income = Object.entries(householdIncome).map(([year, boroughs]) => ({
    year,
    ...boroughs,
  }));

  const populationContent = demographicData?.population_growth?.map(
    (item, index) => (
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
    )
  );

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

  return (
    <Card className="shadow-none border-t rounded-none mt-5">
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
              {demographicData?.population_growth ? (
                populationContent
              ) : (
                <div className="text-sm text-gray-500">
                  No population data available
                </div>
              )}
              <div className="h-80 w-full ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => value.toLocaleString()}
                    />
                    <Legend />
                    <Bar dataKey="Brooklyn" fill="#6366f1" />
                    <Bar dataKey="Manhattan" fill="#10b981" />
                    <Bar dataKey="Bronx" fill="#0ea5e9" />
                    <Bar dataKey="Queens" fill="#0d5cb3" />
                  </BarChart>
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income">
            <div className="space-y-4 max-w-7xl mx-auto">
              {demographicData?.income ? (
                incomeContent
              ) : (
                <div className="text-sm text-gray-500">
                  No income data available
                </div>
              )}
              <div className="h-96 w-full bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg shadow-inner p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={income}
                    margin={{ top: 30, right: 40, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 14, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                      tick={{ fontSize: 14, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "#0f172a",
                      }}
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Median Income",
                      ]}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ fontSize: 14, marginBottom: 10 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Brooklyn"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{
                        r: 6,
                        fill: "#6366f1",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 8,
                        fill: "#6366f1",
                        stroke: "#fff",
                        strokeWidth: 3,
                      }}
                      name="Brooklyn"
                    />
                    <Line
                      type="monotone"
                      dataKey="Queens"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={{
                        r: 6,
                        fill: "#0ea5e9",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 8,
                        fill: "#0ea5e9",
                        stroke: "#fff",
                        strokeWidth: 3,
                      }}
                      name="Queens"
                    />
                    <Line
                      type="monotone"
                      dataKey="Manhattan"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{
                        r: 6,
                        fill: "#10b981",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 8,
                        fill: "#10b981",
                        stroke: "#fff",
                        strokeWidth: 3,
                      }}
                      name="Manhattan"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="border rounded-lg p-4 bg-blue-50 flex flex-col items-center shadow">
                  <div className="text-sm text-gray-500">Brooklyn</div>
                  <div className="text-2xl font-bold text-blue-700">
                    $75,000
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    +28.4% (5yr)
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-cyan-50 flex flex-col items-center shadow">
                  <div className="text-sm text-gray-500">Queens</div>
                  <div className="text-2xl font-bold text-cyan-700">
                    $82,000
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    +19.4% (5yr)
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-green-50 flex flex-col items-center shadow">
                  <div className="text-sm text-gray-500">Manhattan</div>
                  <div className="text-2xl font-bold text-green-700">
                    $105,000
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    +19.5% (5yr)
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spending">
            <div className="space-y-4 max-w-7xl mx-auto">
              {demographicData?.spending ? (
                spendingContent
              ) : (
                <div className="text-sm text-gray-500">
                  No spending data available
                </div>
              )}
              <div className="h-96 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.spending}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      fill="#0ea5e9"
                      label={({ category }) => category}
                    >
                      {/* Custom colors for each category */}
                      <Cell fill="#6366f1" /> {/* Retail */}
                      <Cell fill="#10b981" /> {/* Food */}
                      <Cell fill="#f59e42" /> {/* Entertainment */}
                      <Cell fill="#ef4444" /> {/* Transportation */}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) =>
                        `$${value.toLocaleString()}`
                      }
                    />
                    <Legend />
                  </PieChart>
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
                        Increased consumer reliance on e-commerce driving demand
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

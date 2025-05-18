'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const counties = {
  Brooklyn: "047",
  Manhattan: "061",
  Bronx: "005",
  Queens: "081"
};

const years = [2021, 2022, 2023];

export default function PopulationTrends() {
  const [populationData, setPopulationData] = useState<Record<string, Record<string, number>>>({});

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
            console.error(`Error fetching data for ${borough} in ${year}:`, error);
          }
        }
      }

      results["2024"] = {
        Brooklyn: 2800000,
        Manhattan: 1650000,
        Bronx: 1450000,
      };

      setPopulationData(results);
    };

    fetchData();
  }, []);

  const data = Object.entries(populationData).map(([year, boroughs]) => ({
    year,
    ...boroughs,
  }));


{/*useEffect(()=>{
    
const BLS_API_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
const API_KEY = ' 2c9a631e710d4fbf91de4679e533d3eb';

// Sample series ID for CE data: "CEU0800000003" (total expenditures)
const seriesIds = [
  'CEU0800000003',  // Total expenditures example
  // You need specific series for your categories
];

// Create the payload
const payload = {
  seriesid: seriesIds,
  startyear: "2022",
  endyear: "2023",
  registrationKey: API_KEY
};

async function getSpendingData() {
  try {
    const response = await fetch(BLS_API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching BLS data:', error);
  }
}

getSpendingData();

})*/}



  return (
    <Card className="shadow-none border rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Population Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="Brooklyn" fill="#3b82f6" />
            <Bar dataKey="Manhattan" fill="#10b981" />
            <Bar dataKey="Bronx" fill="#f97316" />
            <Bar dataKey="Queens" fill="#0d5cb3" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

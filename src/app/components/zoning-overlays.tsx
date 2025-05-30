"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
//import axios from "axios";

type ZoneKey = "M1-1" | "R7A" | "C9";

type ZoneInfo = {
  type: string;
  uses: string[];
  municipal: string;
  link: string;
  far: string;
  heightLimit: string;
};

const ZolaMap = dynamic(() => import("./zoning-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      Loading map...
    </div>
  ),
});

const zoningData: Record<ZoneKey, ZoneInfo> = {
  "M1-1": {
    type: "Light Manufacturing",
    uses: ["Warehousing", "Limited Retail", "Auto Repair"],
    municipal: "Article IV, Chapter 1",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/m1.page",
    far: "1.0",
    heightLimit: "No limit (subject to sky exposure)",
  },
  R7A: {
    type: "Residential Contextual",
    uses: ["Apartment Buildings", "Community Facilities"],
    municipal: "Article II, Chapter 3",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/r7a.page",
    far: "4.0",
    heightLimit: "80 ft",
  },
  C9: {
    type: "Commercial",
    uses: ["Retail", "Offices", "Hotels"],
    municipal: "Article V, Chapter 2",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/c9.page",
    far: "2.0",
    heightLimit: "60 ft",
  },
};

export default function ZonesOverlays() {
  const [selectedZone, setSelectedZone] = useState<ZoneKey | null>("M1-1");
 // const [proximityData, setProximityData] = useState(null);
 // const [loading, setLoading] = useState(false);
  const zoneInfo = selectedZone ? zoningData[selectedZone] : null;
  const mapId = "main-zoning-map"; // Unique ID for the map


  // To fetch proximity data when needed in the future
  {/*useEffect(() => {
    // Fetch proximity data or any other data needed when the selected zone changes
    const fetchProximityData = async () => {
      setLoading(true);
      try{
        //Get the data from the latest OM uploaded file
        const response = await axios.get(`NEXT_PUBLIC_API_BASE_URL/source/latest`);

        if(!response.data?.proximityInsights){
          throw new Error("No proximity data found");
        }

        setProximityData(response.data.proximityInsights);
      }catch (error) {
        console.error("Error fetching proximity data:", error);
      }finally {
        setLoading(false);
      }
  };
  fetchProximityData();
  // Cleanup function if needed
    return () => {
      setProximityData(null); // Reset proximity data when component unmounts
    };
}, []); */}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <Card className="shadow-none border-t rounded-none">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <CardTitle className="text-base md:text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Zoning Overlays
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
         <ZolaMap key={mapId} mapId={mapId}  />
        </CardContent>
      </Card>
    </motion.div>
  );
}

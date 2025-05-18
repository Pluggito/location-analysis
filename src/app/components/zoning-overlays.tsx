"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import dynamic from 'next/dynamic';
//import ZolaMap from ""

type ZoneKey = "M1-1" | "R7A" | "C9";

type ZoneInfo = {
  type: string;
  uses: string[];
  municipal: string;
  link: string;
  far: string;
  heightLimit: string;
};

const ZolaMap = dynamic(() => import('./zoning-map'), {
  ssr: false,
});

const zoningData: Record<ZoneKey, ZoneInfo> = {
  "M1-1": {
    type: "Light Manufacturing",
    uses: ["Warehousing", "Limited Retail", "Auto Repair"],
    municipal: "Article IV, Chapter 1",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/m1.page",
    far: "1.0",
    heightLimit: "No limit (subject to sky exposure)"
  },
  R7A: {
    type: "Residential Contextual",
    uses: ["Apartment Buildings", "Community Facilities"],
    municipal: "Article II, Chapter 3",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/r7a.page",
    far: "4.0",
    heightLimit: "80 ft"
  },
  "C9": {
    type: "Commercial",
    uses: ["Retail", "Offices", "Hotels"],
    municipal: "Article V, Chapter 2",
    link: "https://www1.nyc.gov/site/planning/zoning/districts-tools/c9.page",
    far: "2.0",
    heightLimit: "60 ft"
  }
};

export default function ZonesOverlays() {
  const [selectedZone, setSelectedZone] = useState<ZoneKey | null>("M1-1");
  const zoneInfo = selectedZone ? zoningData[selectedZone] : null;

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

            {selectedZone && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
              >
                <Badge className="text-xs bg-black hover:bg-gray-800">
                  {selectedZone}
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Map zoningData keys to selectable badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.keys(zoningData).map(zone => (
              <Badge
                key={zone}
                className={`cursor-pointer ${selectedZone === zone ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                onClick={() => setSelectedZone(zone as ZoneKey)}
              >
                {zone}
              </Badge>
            ))}
          </div>

          <CardDescription className="text-sm md:text-base mt-2">
            {zoneInfo?.type || "Select a zone to view details"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map on one side */}
            <div className="col-span-1">
              <ZolaMap />
            </div>

            {/* Zone description/summary */}
            <div className="flex flex-col space-y-4 text-sm md:text-base  p-4 rounded-md">
              <div className="font-semibold text-gray-800">
                Zone Overview
              </div>

              {zoneInfo ? (
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li><strong>Allowed Uses:</strong> {zoneInfo.uses.join(", ")}</li>
                  <li><strong>FAR:</strong> {zoneInfo.far}</li>
                  <li><strong>Height Limit:</strong> {zoneInfo.heightLimit}</li>
                  <li><strong>Municipal Code:</strong> {zoneInfo.municipal}</li>
                  <li><a href={zoneInfo.link} className="text-blue-600 underline" target="_blank">Learn more</a></li>
                </ul>
              ) : (
                <p className="text-gray-500">Click a zone on the map to view zoning details.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}






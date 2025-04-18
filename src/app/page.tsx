import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Demographics from "./components/demographs-trends";
import SalesComparables from "./components/land-sales-comparables";
import LocationHeader from "./components/location-header";
import Proximity from "./components/proximity";
import SupplyPipeline from "./components/supply-pipeline";
import ZonesOverlays from "./components/zoning-overlays";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container relative overflow-x-hidden mx-auto px-3 md:px-6 lg:px-[16px] border">
      <ArrowLeft size={25} className="mt-3 sm:mt-1" />
      <LocationHeader />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 my-5 space-y-4 md:space-y-0">
  <div className="w-full md:w-auto">
    <h1 className="text-2xl font-bold">Location Analysis</h1>
    <div className="flex flex-wrap items-center mt-2 text-gray-600 text-sm space-x-2">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        <span className="font-medium">280 Richards, Brooklyn, NY</span>
      </div>
      <span className="mx-1">•</span>
      <div className="flex items-center">
        <Building2 className="h-4 w-4 mr-1" />
        <span>Warehouse</span>
      </div>
      <span className="mx-1">•</span>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Date Updated: 11/06/2024</span>
      </div>
    </div>
  </div>

  {/* Responsive Navigation Section */}
  <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto" id="location">
    <div className="text-sm text-left md:text-right mb-2 md:mb-0">
      <div className="font-medium">Underwriting Model</div>
      <div className="text-gray-500 text-xs flex items-center cursor-pointer">
        Industrial/Template v2.4.xlsx
        <ChevronDown className="h-3 w-3 ml-1" />
      </div>
    </div>
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="text-xs w-1/2 md:w-auto"
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        View on Map
      </Button>
      <Button
        variant="default"
        size="sm"
        className="text-xs bg-black hover:bg-gray-800 w-1/2 md:w-auto"
      >
        Export to Excel
      </Button>
    </div>
  </div>
      </div>

      <section id="location">
        <SupplyPipeline />
        <SalesComparables />
        <Demographics />
        <Proximity />
        <ZonesOverlays />
        
      </section>
    </div>
  );
}

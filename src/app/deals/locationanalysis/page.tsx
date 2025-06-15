"use client";

import {
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PdfGenerator from "@/app/components/pdf-extract";
import { useState } from "react";
import SupplyPipeline from "@/app/components/supply-pipeline";
import Demographics from "@/app/components/demographs-trends";
import SalesComparables from "@/app/components/land-sales-comparables";
import Proximity from "@/app/components/proximity";
import ZonesOverlays from "@/app/components/zoning-overlays";
import SourceUpload from "@/app/components/source-upload";



export default function LocationAnalysis() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 my-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Location Analysis</h1>
          <div className="flex flex-wrap items-center mt-2 text-gray-600 text-sm gap-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="font-medium">280 Richards, Brooklyn, NY</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              <span>Warehouse</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Date Updated: 11/06/2024</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full md:w-auto">
          <div className="text-sm">
            <div className="font-medium">Underwriting Model</div>
            <div className="text-gray-500 text-xs flex items-center cursor-pointer">
              Industrial/Template v2.4.xlsx
              <ChevronDown className="h-3 w-3 ml-1" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              <a
                href="https://www.google.com/maps/place/280+Richards+St,+Brooklyn,+NY+11231,+USA"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </Button>
            <PdfGenerator />
          </div>
        </div>
      </div>

      {isUploaded ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <SupplyPipeline loading={loading} setLoading={setLoading} />
          <SalesComparables loading={loading} setLoading={setLoading} />
          <div className="md:col-span-2">
            <Demographics />
          </div>
          <div className="md:col-span-2">
            <Proximity loading={loading} setLoading={setLoading} />
            <ZonesOverlays />
          </div>
        </section>
      ) : (
        <SourceUpload
          loading={loading}
          setLoading={setLoading}
          setIsUploaded={setIsUploaded}
        />
      )}
    </>
  );
}


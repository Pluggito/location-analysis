'use client'

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
import PdfGenerator from "./components/pdf-extract";


export default function Home() {

  return (
    <div className="container relative overflow-x-hidden mx-auto px-3 md:px-6 lg:px-[16px]">
      <ArrowLeft size={25} className="mt-3 sm:mt-1" />
      <LocationHeader />

      <div>
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
          <div
            className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto"
            id="location"
          >
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
                <a
                  href="https://www.google.com/maps/place/280+Richards+St,+Brooklyn,+NY+11231,+USA/@40.6740132,-74.0150686,3a,75y,131.55h,83.45t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDJypCTcQ!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAIMqDu0-zQvUoJabtPXKqOGbIQSWBGycekIyu8Jhw3HYP0_yhOmY34PhScGMWATgZxSzuOQRhn0qCj1vioz8fE-D5gd2eMrgbsG6wbulUQCujIGftM35i9Yc0h8Hp2xgSh0vZZjV6otE%3Dw900-h600-k-no-pi6.5524901700704845-ya277.91431427098394-ro0-fo100!7i7680!8i3840!4m15!1m8!3m7!1s0x89c25a8e10d0997b:0xf9b1c9439c4b0ac!2s280+Richards+St,+Brooklyn,+NY+11231,+USA!3b1!8m2!3d40.6736433!4d-74.0145802!16s%2Fg%2F11c29fb4yg!3m5!1s0x89c25a8e10d0997b:0xf9b1c9439c4b0ac!8m2!3d40.6736433!4d-74.0145802!16s%2Fg%2F11c29fb4yg?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map
                </a>
              </Button>
              <PdfGenerator/>
            </div>
          </div>
        </div>

        <section>
          <SupplyPipeline />
          <SalesComparables />
          <Demographics />
          <Proximity />
          <ZonesOverlays />
        </section>
      </div>
    </div>
  );
}
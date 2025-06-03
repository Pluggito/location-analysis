"use client"


import dynamic from "next/dynamic";
//import { Toaster } from "@/components/ui/sonner";



const  ZoningPPage = dynamic(() => import("./testing"), {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center">
        Loading map...
      </div>
    ),
  });

export default function ZoningPage() {
  


  return (
    <div className="container relative overflow-hidden mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
      <h1 className="text-2xl font-bold my-6">Zoning Analysis</h1>
      <p className="text-gray-600 mb-4">
        This section provides insights into the zoning regulations and classifications for the selected location.
      </p>
      <ZoningPPage/>
    </div>
  );
}
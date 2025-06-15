import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ArrowLeft
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import LocationHeader from "./components/location-header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Location Analysis Tab",
  description:
    "Allows the investor understand the deal’s surrounding market, development risks, and regional dynamics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <div className="container relative overflow-hidden mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <Toaster />
          <ArrowLeft size={25} className="mt-3 sm:mt-1" />
          <LocationHeader />
          {children}
        </div>
      </body>
    </html>
  );
}

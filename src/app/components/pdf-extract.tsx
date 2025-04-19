"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"


interface TableData {
  headers: string[]
  rows: string[][]
}

export default function PdfGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true);
  
    try {
      const doc = new jsPDF();
  
      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("280 Richards - Amazon Lease Summary", 14, 20);
  
      // Property & Tenant Overview
      doc.setFontSize(14);
      doc.text("Property & Tenant Overview", 14, 30);
  
      const propertyData = {
        headers: ["Property Information", "Details"],
        rows: [
          ["Address", "280 Richards, Brooklyn, New York City"],
          ["Property Type", "New Construction Logistics Facility"],
          ["Total Size", "312,000 SF"],
          ["Year Built", "2022"],
          ["Tenant", "Amazon.com Services LLC"],
          ["Guarantor", "Amazon.com, Inc. (S&P: AA)"],
          ["Credit Rating", "AA (S&P)"],
        ],
      };
  
      autoTable(doc, {
        startY: 35,
        head: [propertyData.headers],
        body: propertyData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Lease Structure
      doc.setFontSize(14);
      doc.text("Lease Structure", 14, doc.lastAutoTable!.finalY + 10);
  
      const leaseData = {
        headers: ["Lease Terms", "Details"],
        rows: [
          ["Lease Commencement", "May 2022"],
          ["Lease Expiration", "September 2037"],
          ["Remaining Term", "13 years"],
          ["Annual Rent Escalations", "3.0%"],
          ["Current Annual Rent", "$7,613,773"],
          ["Current Rent PSF", "$24.40 (weighted average)"],
          ["Renewal Options", "Four 5-year options at 100% FMV"],
          ["Other Options", "One-time ROFO (Right of First Offer)"],
          [
            "Recovery Structure",
            "Real Estate Taxes: 100% Recovery\nCAM: 100% Recovery\nInsurance & Management Fee: Incurred by Ownership",
          ],
        ],
      };
  
      autoTable(doc, {
        startY: doc.lastAutoTable!.finalY + 15,
        head: [leaseData.headers],
        body: leaseData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Space Breakdown
      doc.setFontSize(14);
      doc.text("Space Breakdown", 14, doc.lastAutoTable!.finalY + 10);
  
      const spaceData = {
        headers: ["Component", "RSF", "% of NRA", "Annual Rent", "Rent PSF"],
        rows: [
          ["Ground Floor (Warehouse/Mezzanine)", "151,000", "48%", "$5,575,556", "$36.92"],
          ["Rooftop Parking", "161,000", "52%", "$2,038,217", "$12.66"],
          ["Total/Weighted Average", "312,000", "100%", "$7,613,773", "$24.40"],
        ],
      };
  
      autoTable(doc, {
        startY: doc.lastAutoTable!.finalY + 15,
        head: [spaceData.headers],
        body: spaceData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Add a new page
      doc.addPage();
  
      // Property Specifications
      doc.setFontSize(14);
      doc.text("Property Specifications", 14, 20);
  
      const specsData = {
        headers: ["Features", "Details"],
        rows: [
          ["Clear Height", "36 feet"],
          ["Column Spacing", "63' x 54'"],
          ["Loading Docks", "5 docks (capacity for 28)"],
          ["Drive-In Entrances", "2 entrances"],
          [
            "Parking",
            "393 total spaces (194 roof, 91 ground exterior, 63 ground garage, 40 van loading, 5 on-dock truck)",
          ],
          ["EV Infrastructure", "55 EV charging stations"],
          ["Site Area", "16 acres"],
        ],
      };
  
      autoTable(doc, {
        startY: 25,
        head: [specsData.headers],
        body: specsData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Financial Highlights
      doc.setFontSize(14);
      doc.text("Financial Highlights", 14, doc.lastAutoTable!.finalY + 10);
  
      const financialData = {
        headers: ["Financial Metrics", "Details"],
        rows: [
          ["Current NOI (Year 1)", "$7,271,429"],
          ["Contractual Rental Revenue", "$120+ million through 2037"],
          ["Mark-to-Market Potential", "30%+ at lease expiration"],
          ["Assumable Financing", "$72.9 million at 3.85% through February 2028"],
        ],
      };
  
      autoTable(doc, {
        startY: doc.lastAutoTable!.finalY + 15,
        head: [financialData.headers],
        body: financialData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Market Analysis
      doc.setFontSize(14);
      doc.text("Market Analysis", 14, doc.lastAutoTable!.finalY + 10);
  
      const marketData = {
        headers: ["Market Factors", "Details"],
        rows: [
          ["Submarket", "Red Hook, Brooklyn"],
          ["Submarket Vacancy", "Approximately 5%"],
          ["Borough Average Taking Rents", "Exceed $40 PSF"],
          ["YTD Net Absorption (Boroughs)", "625,000 SF"],
          ["Q1 2024 Leasing Volume (Boroughs)", "900,000 SF (70% higher than last year's quarterly average)"],
        ],
      };
  
      autoTable(doc, {
        startY: doc.lastAutoTable!.finalY + 15,
        head: [marketData.headers],
        body: marketData.rows,
        theme: "grid",
        headStyles: { fillColor: [51, 51, 51] },
      });
  
      // Location Highlights
      doc.setFontSize(14);
      doc.text("Location Highlights", 14, doc.lastAutoTable!.finalY + 10);
  
      const locationHighlights = [
        "• Located on Brooklyn's waterfront in Red Hook logistics submarket",
        "• Less than 5 minutes from Brooklyn Battery Tunnel and Downtown Manhattan",
        "• Within 40 minutes of JFK and LaGuardia Airports",
        "• Adjacent to Red Hook Container Terminal",
        "• Access to 4 of the 5 most affluent zip codes in Brooklyn",
        "• Average household income within 2-mile radius: approximately $160,000",
        "• Access to Brooklyn's 2.8 million consumers (31% of NYC population)",
      ];
  
      doc.setFontSize(11);
      let yPos = doc.lastAutoTable!.finalY + 15;
      locationHighlights.forEach((highlight) => {
        doc.text(highlight, 14, yPos);
        yPos += 7;
      });
  
      // Risk Factors
      doc.setFontSize(12);
      doc.text("Risk Factors", 12, yPos + 5);
  
      const riskFactors = [
        "• Financing assumption required by 2028 (current debt matures in February 2028)",
        "• Market rent growth assumptions may not materialize",
        "• Tenant-specific risk related to Amazon's changing distribution strategy",
        "• Brooklyn zoning changes introduced in May 2024 could impact future property value",
      ];
  
      doc.setFontSize(9);
      yPos += 10;
      riskFactors.forEach((risk) => {
        doc.text(risk, 9, yPos);
        yPos += 5;
      });
  
      // Opportunity Summary
      doc.setFontSize(14);
      doc.text("Opportunity Summary", 14, yPos + 5);
  
      const opportunitySummary = [
        "280 Richards represents a core logistics investment with:",
        "1. Investment grade tenant (Amazon - S&P: AA)",
        "2. Long-term lease (13 years remaining) with 3% annual escalations",
        "3. Assumable below-market financing ($72.9M at 3.85% through Feb-2028)",
        "4. Strategic infill location in supply-constrained submarket",
        "5. New construction (2022) with modern specifications",
        "6. Potential 30%+ mark-to-market opportunity at lease expiration",
      ];
  
      doc.setFontSize(11);
      yPos += 10;
      opportunitySummary.forEach((item) => {
        doc.text(item, 14, yPos);
        yPos += 7;
      });
  
      // Source
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Source: 280 Richards - Confidential Offering Memorandum by Newmark", 14, yPos + 5);
  
      // Save the PDF
      doc.save("280-Richards-Amazon-Lease-Summary.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={generatePDF}
        variant="default"
        size="sm"
        className="text-xs bg-black hover:bg-gray-800"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <FileDown className="h-3 w-3 mr-1" />
            Download PDF
          </>
        )}
      </Button>
    </motion.div>
  )
}

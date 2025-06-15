import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function RealEstatePipeline() {
  const supplyPipelineData = [
    {
      id: 1,
      image: "/640 Columbia.png",
      address: "640 Columbia",
      submarket: "Brooklyn",
      deliveryDate: "Jun-25",
      owner: "CBRE1",
      sf: "336,350",
    },
    {
      id: 2,
      image: "/WB Mason.png",
      address: "WB Mason",
      submarket: "Bronx",
      deliveryDate: "May-25",
      owner: "Link Logistics",
      sf: "150,000",
    },
  ];

  const saleComparablesData = [
    {
      id: 1,
      image: "/Debaun Road.png",
      address: "1 Debaun Road",
      submarket: "Millstone, NJ",
      date: "Jun-24",
      sf: "132,930",
      pp: "$41,903,580",
      owner: "Cabot",
      tenant: "Berry Plastics",
    },
    {
      id: 2,
      image: "/Baylis 495.png",
      address: "Baylis 495 Business Park",
      submarket: "Melville, NY",
      date: "May-24",
      sf: "103,500",
      pp: "$44,000,000",
      owner: "Betnal Green",
      tenant: "Dr. Pepper",
    },
    {
      id: 3,
      image: "/Edgeboro Road.png",
      address: "39 Edgeboro Road",
      submarket: "Millstone, NJ",
      date: "Oct-23",
      sf: "513,240",
      pp: "$165,776,520",
      owner: "Blackstone",
      tenant: "FedEx",
    },
    {
      id: 4,
      image: "/Terminal Logistics.png",
      address: "Terminal Logistics Center",
      submarket: "Queens, NY",
      date: "Mar-23",
      sf: "336,000",
      pp: "$135,000,000",
      owner: "Goldman",
      tenant: "Do & Co",
    },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Supply Pipeline Section */}
        <div className="lg:col-span-1 relative pr-4">
          <h2 className="text-xl font-bold mb-6">Supply Pipeline</h2>
          <div className="space-y-4">
            {supplyPipelineData.map((property) => (
              <Card
                key={property.id}
                className="rounded-none border-none shadow-none"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.address}
                        width={120}
                        height={70}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="grid grid-cols-1 gap-x-4 text-sm">
                        <div>
                          <span className="font-semibold">Address:</span>{" "}
                          {property.address}
                        </div>
                        <div>
                          <span className="font-semibold">Submarket:</span>{" "}
                          {property.submarket}
                        </div>
                        <div>
                          <span className="font-semibold">Delivery Date:</span>{" "}
                          {property.deliveryDate}
                        </div>
                        <div>
                          <span className="font-semibold">Owner:</span>{" "}
                          {property.owner}
                        </div>
                        <div>
                          <span className="font-semibold">SF:</span>{" "}
                          {property.sf}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Vertical Separator */}
          <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gray-200"></div>
        </div>

        {/* Sale Comparables Section */}
        <div className="lg:col-span-3 pl-4">
          <h2 className="text-xl font-bold mb-6">Sale Comparables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saleComparablesData.map((property) => (
              <Card
                key={property.id}
                className="rounded-none border-none shadow-none"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.address}
                        width={150}
                        height={80}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-semibold">Address:</span>{" "}
                          {property.address}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="font-semibold">Submarket:</span>{" "}
                            {property.submarket}
                          </div>
                          <div>
                            <span className="font-semibold">Date:</span>{" "}
                            {property.date}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="font-semibold">SF:</span>{" "}
                            {property.sf}
                          </div>
                          <div>
                            <span className="font-semibold">PP:</span>{" "}
                            {property.pp}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="font-semibold">Owner:</span>{" "}
                            {property.owner}
                          </div>
                          <div>
                            <span className="font-semibold">Tenant:</span>{" "}
                            {property.tenant}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
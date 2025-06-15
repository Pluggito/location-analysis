import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Property {
    id: number
    name: string
    location: string
    type: string
    subtype: string
    sqft: string
    irr: string
    equityMultiple: string
    returnOnEquity: string
    pricePsf: string
    imageUrl: string
}

const properties: Property[] = [
    {
        id: 1,
        name: "280 Richards",
        location: "Brooklyn, NY",
        type: "Warehouse",
        subtype: "",
        sqft: "312,000 sqft",
        irr: "11.9%",
        equityMultiple: "2.1x",
        returnOnEquity: "16.3%",
        pricePsf: "$23.92",
        imageUrl: "/280 richard.png",
    },
    {
        id: 2,
        name: "397 Ferry Street",
        location: "Newark, NJ",
        type: "Industrial",
        subtype: "Warehouse",
        sqft: "65,535 sqft",
        irr: "17.6%",
        equityMultiple: "3.2x",
        returnOnEquity: "19.5%",
        pricePsf: "$32.30",
        imageUrl: "/397 ferry.png",
    },
    {
        id: 3,
        name: "Kearny Street",
        location: "Kearny, NJ",
        type: "Industrial",
        subtype: "Warehouse",
        sqft: "207,000 sqft",
        irr: "14.8%",
        equityMultiple: "2.6x",
        returnOnEquity: "15.8%",
        pricePsf: "$22.30",
        imageUrl: "/Kearny.png",
    },
    {
        id: 4,
        name: "Matrix Center",
        location: "Camden, NJ",
        type: "Industrial",
        subtype: "Warehouse",
        sqft: "270,600 sqft",
        irr: "12.2%",
        equityMultiple: "2.2x",
        returnOnEquity: "11.4%",
        pricePsf: "$11.20",
        imageUrl: "/Matrix Center.png",
    },
]

export default function Pipeline() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 mt-4 ">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Deal Pipeline</h1>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full md:w-auto">
                    <div className="text-sm">
                        <div className="font-medium">Underwriting Model</div>
                        <div className="text-gray-500 text-xs flex items-center cursor-pointer">
                            Industrial/Template v2.4.xlsx
                            <ChevronDown className="h-3 w-3 ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-4" />

            {/* Property Table */}
            <Card className="rounded-none border-none shadow-none ">
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="">
                                    <th className="text-left p-4 font-medium text-gray-700">Property</th>
                                    <th className="text-center p-4 font-medium text-gray-700">IRR</th>
                                    <th className="text-center p-4 font-medium text-gray-700">Equity Multiple</th>
                                    <th className="text-center p-4 font-medium text-gray-700">Return on Equity</th>
                                    <th className="text-center p-4 font-medium text-gray-700">Price psf</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property, index) => (
                                    <tr
                                        key={property.id}
                                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                                    >
                                        <td className="p-4">
                                            <Link href={`/deals`} className="block">
                                                <div className="flex items-center gap-3 w-[750px] cursor-pointer">
                                                    <div className="relative w-52 h-25 rounded-lg overflow-hidden bg-gray-200">
                                                        <Image
                                                            src={property.imageUrl || "/placeholder.svg"}
                                                            alt={`${property.name} property`}
                                                            fill
                                                            className="object-cover object-center"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {property.name}, {property.location}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {property.type}
                                                            {property.subtype && `, ${property.subtype}`}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{property.sqft}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center font-medium">
                                            <Link href={`/deals`} className="block cursor-pointer">
                                                {property.irr}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center font-medium">
                                            <Link href={`/deals`} className="block cursor-pointer">
                                                {property.equityMultiple}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center font-medium">
                                            <Link href={`/deals`} className="block cursor-pointer">
                                                {property.returnOnEquity}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center font-medium">
                                            <Link href={`/deals`} className="block cursor-pointer">
                                                {property.pricePsf}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  BarChart3,
  Clock,
  Home,
  Car,
  Truck,
  Star,
  ChevronDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RealEstatePipeline from "../components/real-estate-pipeline";

export default function DealOverview() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 mt-4 ">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Deal Overview</h1>
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
      <div>
        <div className="grid lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-1">
            <div className="relative">
              <Image
                src="/280 richard.png"
                alt="280 Richards, Brooklyn, NY - Warehouse Property"
                width={300}
                height={250}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Click for Google Street View
              </div>
            </div>
          </div>

          <div className="lg:col-span-2  py-6 grid grid-cols-1 gap-6">
            <div className="flex justify-between items-start mb-4 ">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  280 Richards, Brooklyn, NY
                </h1>
                <p className="text-gray-600">Data Uploaded: 11/06/2024</p>
                <Badge variant="secondary" className="mt-1">
                  Warehouse
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  Export to Excel
                </Button>
                <Button variant="outline" size="sm">
                  Generate PowerPoint
                </Button>
              </div>
            </div>

            {/* Property Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 rounded-lg ">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">Seller</span>
                </div>
                <p className="font-semibold">The Equities</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">Guidance Price</span>
                </div>
                <p className="font-semibold">$143,000,000</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">
                    Guidance Price PSF
                  </span>
                </div>
                <p className="font-semibold">$23.92</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">Cap Rate</span>
                </div>
                <p className="font-semibold">5.0%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">Property Size</span>
                </div>
                <p className="font-semibold">312,000 sqft</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-600">Land Area</span>
                </div>
                <p className="font-semibold">16 acres</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Deal Summary and Asset Data */}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="rounded-none border-none shadow-none ">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Deal Summary</h2>
                <p className="text-gray-700 leading-relaxed">
                  280 Richards, fully leased to Amazon, aligns with HUSPP's
                  strategy of acquiring prime logistics assets in Brooklyn's
                  high-demand Red Hook submarket. With 13 years remaining on the
                  lease and 3% annual rent escalations, it offers stable,
                  long-term cash flow. While single-tenant exposure is a risk,
                  Amazon's investment-grade rating and renewal options enhance
                  its resilience, making it a strong addition to HUSPP's
                  portfolio.
                </p>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Personalized Insights</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Jake Klein viewed this deal in 2019, but decided not to
                        proceed due to{" "}
                        <span className="text-blue-600 underline">
                          lack of potential upside
                        </span>
                        .
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        On 10/19/2021, your firm bid on{" "}
                        <span className="text-blue-600 underline">
                          51 St. Brooklyn, NY 11231
                        </span>
                        , a larger site also occupied by Amazon 0.5 miles away.{" "}
                        <span className="text-blue-600 underline">
                          Brookfield won the deal for $43M
                        </span>
                        ; cap rates in the area have compressed 450ps since
                        then.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        On 01/19/2025, Tom, VP of Research, noted in the
                        Investment Committee meeting that congestion pricing has
                        driven{" "}
                        <span className="text-blue-600 underline">
                          renewed demand for infill industrial in Brooklyn
                        </span>
                        .
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset-Level Data */}
          <div className="lg:col-span-1 ">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6 text-center text-gray-500">
                  Asset-Level Data
                </h2>

                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex items-center mb-2">
                      <Building className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl flex-col flex font-bold text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Clear Heights
                        </span>
                        36'
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Building className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl flex-col flex font-bold text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Column Spacing
                        </span>
                        63' X 54'
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Car className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl flex flex-col font-bold text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Parking Spaces
                        </span>
                        393
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Truck className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl flex flex-col font-bold text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          # of Dock Doors
                        </span>
                        28
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl flex flex-col font-bold text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Tenant
                        </span>
                        Amazon
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Building className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl font-bold flex flex-col text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Seaward Area
                        </span>
                        357,151 sqft
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl font-bold flex flex-col text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Year Built
                        </span>
                        2021
                      </div>
                    </div>

                    <div className="flex items-center mb-2">
                      <Home className="w-5 h-5 mr-3 text-gray-800" />
                      <div className="text-2xl font-bold flex flex-col text-gray-900">
                        <span className="text-xs text-gray-500 font-medium">
                          Occupancy Rate
                        </span>
                        100%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Financial Metrics Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Projected Financial Metrics */}
          <div className="relative">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-6 ">
                <h3 className="font-semibold mb-4 text-gray-600">
                  Projected Financial Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">IRR</span>
                    </div>
                    <p className="text-2xl font-bold">13.9%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Equity Multiple
                      </span>
                    </div>
                    <p className="text-2xl font-bold">2.3x</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Return on Equity
                      </span>
                    </div>
                    <p className="text-2xl font-bold">18.5%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Return on Cost
                      </span>
                    </div>
                    <p className="text-2xl font-bold">19.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Vertical separator - hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gray-200"></div>
          </div>

          {/* Key Assumptions */}
          <div className="relative">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-600">
                  Key Assumptions
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">Exit Price</span>
                    </div>
                    <p className="text-2xl font-bold">$195,000,000</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Exit Cap Rate
                      </span>
                    </div>
                    <p className="text-2xl font-bold">5.0%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Rental Growth
                      </span>
                    </div>
                    <p className="text-2xl font-bold">3.5%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">Hold Period</span>
                    </div>
                    <p className="text-2xl font-bold">16 Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Vertical separator */}
            <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gray-200"></div>
          </div>

          {/* Market Analysis */}
          <div className="relative">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-600">
                  Market Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Nearest Urban Center
                      </span>
                    </div>
                    <p className="text-2xl font-bold">Brooklyn, NY</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Population Growth Rate
                      </span>
                    </div>
                    <p className="text-2xl font-bold">1.2%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Median Household Income
                      </span>
                    </div>
                    <p className="text-2xl font-bold">$76,912</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Unemployment Rate
                      </span>
                    </div>
                    <p className="text-2xl font-bold">7.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Vertical separator */}
            <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gray-200"></div>
          </div>

          {/* Lease Analysis */}
          <div className="relative">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-600">
                  Lease Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">Rent PSF</span>
                    </div>
                    <p className="text-2xl font-bold">$24.40</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">WALT</span>
                    </div>
                    <p className="text-2xl font-bold">13 Yrs (Sep 37)</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Rent Escalations
                      </span>
                    </div>
                    <p className="text-2xl font-bold">3%</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span className="text-sm text-gray-600">
                        Mark-to-Market Opportunity
                      </span>
                    </div>
                    <p className="text-2xl font-bold">30%+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* No separator on the last column */}
          </div>
        </div>
      </div>
      <Separator className="my-4"/>
      <RealEstatePipeline />
    </>
  );
}

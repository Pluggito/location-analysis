"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Clock, MapPin, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  AnimatedContainer,
  AnimatedItem,
  AnimatedProgress,
} from "@/components/ui/animate";
import { useEffect, useState } from "react";
import axios from "axios";

interface NearbyDevelopment {
  supply: string;
  name: string;
  description: string;
  tenant: string;
}

interface ConstructionTimeline {
  project: string;
  completion: string;
  name: string;
  address: string;
  distance: string;
  status: string;
  progress: number;
  size: string;
  type: string;
  developer: string;
  tenant: string;
  description: string;
}

interface PropertyTypeMix {
  type: string;
  percentage: number;
}

interface SupplyPipelineData {
  nearby_developments: NearbyDevelopment[];
  construction_timelines: ConstructionTimeline[];
  property_type_mix: PropertyTypeMix[];
}

interface ApiResponse {
  supplyPipeline: SupplyPipelineData;
  success?: boolean;
  error?: string;
}

interface SupplyPipelineProps {
  setLoading: (value: boolean) => void;
  loading: boolean;
}

const SupplyPipeline: React.FC<SupplyPipelineProps> = ({
  loading,
  setLoading,
}) => {
  const [supplyData, setSupplyData] = useState<SupplyPipelineData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplyPipeline = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>("http://localhost:5000/data/latest");

        if (!response.data?.supplyPipeline) {
          throw new Error("Invalid data format received from server");
        }

        setSupplyData(response.data.supplyPipeline);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load supply pipeline data";
        console.error("Error fetching supply pipeline data:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplyPipeline();
  }, [setLoading]);

  if (error) {
    return (
      <Card className="shadow-none w-full rounded-none">
        <CardContent className="p-6">
          <div className="text-red-500">Error loading supply pipeline data: {error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!supplyData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-none w-full rounded-none">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Supply Pipeline
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Limited New Supply
            </Badge>
          </div>
          <CardDescription>
            Nearby developments, construction timelines, and property type mix
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <AnimatedContainer stagger={true} className="space-y-4">
                {supplyData.construction_timelines?.length > 0 ? (
                  supplyData.construction_timelines.map((item, index) => (
                    <AnimatedItem key={index} index={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.project || "N/A"}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.address || "N/A"}
                            <span className="mx-1">•</span>
                            {item.distance || "N/A"}
                          </div>
                        </div>
                        <Badge
                          variant={
                            item.status === "Under Construction"
                              ? "default"
                              : item.status === "Planned"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {item.status || "N/A"}
                        </Badge>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Completion: {item.completion || "N/A"}</span>
                          <span className="font-medium">{item.progress || "N/A"}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <AnimatedProgress value={item.progress || "N/A"} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <div className="text-gray-500">Size</div>
                          <div className="font-medium">{item.size || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Property Type</div>
                          <div className="font-medium">{item.type || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Developer/Owner</div>
                          <div className="font-medium">{item.developer || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Tenant</div>
                          <div className="font-medium">{item.tenant || "N/A"}</div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-600">{item.description || "N/A"}</div>
                    </AnimatedItem>
                  ))
                ) : (
                  <p>No construction timelines available.</p>
                )}
              </AnimatedContainer>

              {supplyData.nearby_developments?.length > 0 ? (
                supplyData.nearby_developments.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4"
                  >
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">
                          Supply Constraints
                        </h4>
                        <p className="mt-2 text-sm text-amber-700">
                          {item.supply || "N/A"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No nearby developments available.</p>
              )}
            </TabsContent>

            <TabsContent value="timeline">
              {supplyData?.construction_timeline?.length > 0 ? (
                supplyData.construction_timeline.map((dev, index) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                      <Clock className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="mb-1 flex items-baseline">
                      <span className="font-medium">{dev.completion || "N/A"}</span>
                      <span className="ml-2 text-sm text-gray-500">{dev.name || "N/A"}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{dev.address || "N/A" }</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Badge
                        variant={
                          dev.status === "Under Construction"
                            ? "default"
                            : dev.status === "Planned"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs mr-2"
                      >
                        {dev.status || "N/A"}
                      </Badge>
                      <span>
                        {dev.size || "N/A"} • {dev.type || "N/A"}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No construction timelines available.</p>
              )}

              {supplyData?.nearby_developments?.length > 0 ? (
                supplyData.nearby_developments.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4"
                  >
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">
                          {item.name || "N/A"}
                        </h4>
                        <p className="mt-2 text-sm text-amber-700">
                          {item.description || "N/A"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No nearby developments available.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SupplyPipeline;
import { useState } from 'react';
import { MapPin, Building, TrendingUp, Navigation, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function Testing() {
  const [activeSection, setActiveSection] = useState('summary');
  const [expandedPanels, setExpandedPanels] = useState({
    supply: true,
    demographics: true,
    proximity: true,
    comparables: true,
    zoning: true
  });

  const togglePanel = (panel) => {
    setExpandedPanels({
      ...expandedPanels,
      [panel]: !expandedPanels[panel]
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 font-medium ${activeSection === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('summary')}
        >
          Summary
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSection === 'data' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('data')}
        >
          Market Data
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSection === 'map' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveSection('map')}
        >
          Map View
        </button>
      </div>

      {/* Main Content Area */}
      {activeSection === 'summary' && (
        <div className="space-y-6">
          {/* Key Location Highlights */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Location Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>Core infill location in Red Hook, Brooklyn waterfront</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>Less than 5 minutes from Brooklyn Battery Tunnel</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>Adjacent to Red Hook Container Terminal (65-acre port)</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>40 minutes from JFK and LaGuardia Airports</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>Access to Brooklyn's 2.8M consumers (31% of NYC population)</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-blue-600 mt-1 flex-shrink-0" size={18} />
                <span>Covers 4 of 5 most affluent zip codes in Brooklyn</span>
              </div>
            </div>
          </div>

          {/* Supply Pipeline */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => togglePanel('supply')}
            >
              <div className="flex items-center">
                <Building className="mr-2 text-gray-600" size={18} />
                <h3 className="font-semibold">Supply Pipeline</h3>
              </div>
              {expandedPanels.supply ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {expandedPanels.supply && (
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Development Trends</h4>
                  <p className="text-sm text-gray-600">Brooklyn's logistics inventory has declined by more than 6 MSF over the past decade due to commercial/residential conversions. Residential developers are willing to pay 3X premium for land sites.</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Permitting Constraints</h4>
                  <p className="text-sm text-gray-600">New industrial permit (May 2024) mandates last-mile facilities to apply for a special permit from the City Planning Commission, restricting future development.</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Market Vacancy</h4>
                  <p className="text-sm text-gray-600">Brooklyn submarket surrounding 280 Richards stands at approximately 5% vacancy despite moderating leasing totals nationwide.</p>
                </div>
              </div>
            )}
          </div>

          {/* Demographics */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => togglePanel('demographics')}
            >
              <div className="flex items-center">
                <TrendingUp className="mr-2 text-gray-600" size={18} />
                <h3 className="font-semibold">Demographics & Market Trends</h3>
              </div>
              {expandedPanels.demographics ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {expandedPanels.demographics && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Population Stats</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Brooklyn Population:</span>
                        <span className="text-sm font-medium">2.8 million (31% of NYC)</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Households within 10-mile radius:</span>
                        <span className="text-sm font-medium">2.5M+ (by 2028)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Population Density:</span>
                        <span className="text-sm font-medium">Highest in US</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Income & Spending</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Avg HH Income (2-mile radius):</span>
                        <span className="text-sm font-medium">$160,000</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Avg Annual HH Spending:</span>
                        <span className="text-sm font-medium">$30,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Consumer Spending (10-mile):</span>
                        <span className="text-sm font-medium">$75 billion+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">E-Commerce Growth</h4>
                  <p className="text-sm text-gray-600">E-commerce gross sales still only consists of approximately 15% of total retail sales in America, as of Q1 2024. Amazon dominates the U.S. e-commerce landscape with a commanding #1 market share of gross sales.</p>
                </div>
              </div>
            )}
          </div>

          {/* Proximity Insights */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => togglePanel('proximity')}
            >
              <div className="flex items-center">
                <Navigation className="mr-2 text-gray-600" size={18} />
                <h3 className="font-semibold">Proximity Insights</h3>
              </div>
              {expandedPanels.proximity ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {expandedPanels.proximity && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Distance to Key Points</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">4 miles</span>
                    <span className="text-xs text-gray-500">Downtown Brooklyn</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">5 miles</span>
                    <span className="text-xs text-gray-500">Manhattan</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">11 miles</span>
                    <span className="text-xs text-gray-500">LaGuardia Airport</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">20 miles</span>
                    <span className="text-xs text-gray-500">JFK Airport</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">20 miles</span>
                    <span className="text-xs text-gray-500">Newark Airport</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <span className="block text-sm font-medium">Adjacent</span>
                    <span className="text-xs text-gray-500">Red Hook Container Terminal</span>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mt-4 mb-2">Amazon Regional Network</h4>
                <p className="text-sm text-gray-600 mb-3">Property strategically positioned within Amazon's NY Metro distribution network. Amazon occupies 7.5 MSF across NY boroughs and 9.0 MSF in proximate Northern NJ, for a total of 16.5 MSF.</p>
                
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Key Regional Facilities:</span>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>526-566 Gulf Ave (Staten Island): 1.4 MSF</li>
                    <li>55-15 Grand Ave (Queens): 770,000 SF</li>
                    <li>2505 Bruckner Blvd (Bronx): 690,000 SF</li>
                    <li>640 Columbia St (Brooklyn): nearby similar facility</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Land Sale Comparables */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => togglePanel('comparables')}
            >
              <div className="flex items-center">
                <FileText className="mr-2 text-gray-600" size={18} />
                <h3 className="font-semibold">Sale Comparables</h3>
              </div>
              {expandedPanels.comparables ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {expandedPanels.comparables && (
              <div className="p-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SF</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price PSF</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cap Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Jun-22</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">640 Columbia Street</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Amazon</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Brooklyn</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">336,350</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">$981</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">3.5%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Jun-22</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">12555 Flatlands</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Amazon</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Brooklyn</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">211,000</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">$1,090</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">3.5%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Jan-22</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">55 Bay Street</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Amazon Fresh</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Brooklyn</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">85,000</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">$529</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">5.1%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Aug-21</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">1080 Leggett</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Amazon Fresh</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Bronx</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">140,348</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">$830</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">3.5%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Aug-21</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">511 Barry Street</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Amazon</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">Bronx</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">139,700</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">$852</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">2.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Zoning Information */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => togglePanel('zoning')}
            >
              <div className="flex items-center">
                <FileText className="mr-2 text-gray-600" size={18} />
                <h3 className="font-semibold">Zoning Information</h3>
              </div>
              {expandedPanels.zoning ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {expandedPanels.zoning && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Zoning Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amazon Last-Mile Use Zones:</span>
                        <span className="text-sm font-medium">M or C9 zones</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Special Permit Required:</span>
                        <span className="text-sm font-medium">Yes (as of May 2024)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Permit Authority:</span>
                        <span className="text-sm font-medium">City Planning Commission</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Development Restrictions</h4>
                    <p className="text-sm text-gray-600">New industrial permit introduced in May 2024 mandates last-mile facilities to apply for a special permit from the City Planning Commission, which will restrict future development. Uncertainty of approval will discourage speculative industrial development.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeSection === 'data' && (
        <div className="p-4 text-center text-gray-500">
          Detailed market data visualizations would appear here
        </div>
      )}
      
      {activeSection === 'map' && (
        <div className="p-4 text-center text-gray-500">
          Interactive map with property location and surrounding points of interest would appear here
        </div>
      )}
    </div>
  );
}
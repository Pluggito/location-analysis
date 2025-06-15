import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

export default function CommercialDistrictMap() {
  const [commercialData, setCommercialData] = useState(null);
  const [specialDistrictData, setSpecialDistrictData] = useState(null);
  const [limitedHeightData, setLimitedHeightData] = useState(null); // 🆕
  const [appendixData, setAppendixData] = useState(null); // 🆕 for the new file
  const [dcmAlternationsData, setDCMAlternationsData] = useState(null); // 🆕 for DCM alternations

  useEffect(() => {
    fetch('/commercialzoning.geojson')
      .then(res => res.json())
      .then(data => setCommercialData(data));

    fetch('/specialdistrict.geojson')
      .then(res => res.json())
      .then(data => setSpecialDistrictData(data));

    fetch('/limitedheight.geojson') // 🆕 your new file
      .then(res => res.json())
      .then(data => setLimitedHeightData(data));

    fetch('/appendix.geojson')
      .then(res => res.json())
      .then(data => setAppendixData(data));

    fetch('/dcm_alternations.geojson')
      .then(res => res.json())
      .then(data => 
        setDCMAlternationsData(data
      ) // 🆕 for DCM alternations data
      )
  }, []);

  const overlayColorMap: Record<string, string> = {
    'C1-2': '#ff6600',
    'C1-3': '#ffa500',
    'C2-4': '#ff3333',
    'C4-3': '#33ccff',
  };

  const commercialStyle = (feature: any) => {
    const overlay = feature.properties.OVERLAY;
    const color = overlayColorMap[overlay] || 'orange';
    return { color, weight: 2, fillOpacity: 0.3 };
  };

  const onEachCommercial = (feature: any, layer: any) => {
    const { OVERLAY } = feature.properties;
    layer.bindTooltip(`Overlay: ${OVERLAY}`, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  const specialStyle = () => ({ color: '#8e44ad', weight: 2, fillOpacity: 0.15 });

  const onEachSpecial = (feature: any, layer: any) => {
    const label = feature.properties.SDNAME || 'Special District';
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  // 🆕 Limited Height style and tooltip
  const lhStyle = () => ({ color: '#2ecc71', weight: 2, fillOpacity: 0.2 });

  const onEachLH = (feature: any, layer: any) => {
    const label = `${feature.properties.LHNAME} (${feature.properties.LHLBL})`;
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  const appendixStyle = () => ({ color: '#e74c3c', weight: 2, fillOpacity: 0.2 });
  const onEachAppendix = (feature: any, layer: any) => {
    const label = feature.properties.APPENDIX_NAME || 'Appendix Area';
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  const dcmAlternationsStyle = () => ({ color: '#f39c12', weight: 2, fillOpacity: 0.2 });
  const onEachDCMAlternation = (feature: any, layer: any) => {
    const label = feature.properties.ALTERNATION_NAME || 'DCM Alternation Area';
    layer.bindTooltip(label, { sticky: true, direction: 'top', offset: [0, -10] });
  };

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {commercialData && (
        <GeoJSON data={commercialData} style={commercialStyle} onEachFeature={onEachCommercial} />
      )}

      {specialDistrictData && (
        <GeoJSON data={specialDistrictData} style={specialStyle} onEachFeature={onEachSpecial} />
      )}

      {limitedHeightData && (
        <GeoJSON data={limitedHeightData} style={lhStyle} onEachFeature={onEachLH} />
      )}

      {appendixData && (
        <GeoJSON data={appendixData} style={appendixStyle} onEachFeature={onEachAppendix} />
      )}

      {dcmAlternationsData && (
        <GeoJSON data={dcmAlternationsData} style={dcmAlternationsStyle} onEachFeature={onEachDCMAlternation} />
      )}

    </MapContainer>
  );
}

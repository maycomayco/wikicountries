"use client";

import { LatLngExpression } from "leaflet";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

const customIcon = new Icon({
  iconUrl: iconMarker.src,
  shadowUrl: iconShadow.src,
});

function MyComponent({ position, countryInfo }: any) {
  const map = useMap();
  map.setView(position);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <h2 className="text-lg font-semibold">{countryInfo.name}</h2>
          <p>
            <span className="font-semibold">Capital: </span>
            {countryInfo.capital}
          </p>
          <p>
            <span className="font-semibold">Currency: </span>
            {countryInfo.currency}
          </p>
          <p>
            <span className="font-semibold">AWS Region: </span>
            <span className="font-mono p-1 bg-slate-100/50 rounded">
              {countryInfo.awsRegion}
            </span>{" "}
            🤓
          </p>
        </Popup>
      </Marker>
    </>
  );
}

export default function LeafletMapWrapper({ lat, long, countryInfo }: any) {
  const [position, setPosition] = useState<LatLngExpression>([+lat, +long]);

  const parsedCountryInfo = JSON.parse(countryInfo);

  useEffect(() => {
    setPosition([+lat, +long]);
  }, [lat, long]);

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <MyComponent position={position} countryInfo={parsedCountryInfo} />
      </MapContainer>
    </div>
  );
}

"use client";

import { LatLngExpression } from "leaflet";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parse } from "path";

const customIcon = new Icon({
  iconUrl: iconMarker.src,
  shadowUrl: iconShadow.src,
});

function MyComponent({ position }: any) {
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
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
}

export default function LeafletMapWrapper({ lat, long }: any) {
  const [position, setPosition] = useState<LatLngExpression>([+lat, +long]);

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
        <MyComponent position={position} />
      </MapContainer>
    </div>
  );
}

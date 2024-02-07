import { Icon, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";

import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import { CountryApiGraphQlResponse, LeafletProps } from "@/types";

const customIcon = new Icon({
  iconUrl: iconMarker.src,
  shadowUrl: iconShadow.src,
});

interface MyMapComponentProps {
  position: LatLngExpression;
  countryInfo: CountryApiGraphQlResponse
}

function MyMapComponent({ position, countryInfo }: MyMapComponentProps) {
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
            <span className="rounded bg-slate-100/50 p-1 font-mono">
              {countryInfo.awsRegion}
            </span>{" "}
            🤓
          </p>
        </Popup>
      </Marker>
    </>
  );
}

export default function Map({lat, long, countryInfo}: LeafletProps) {
  const [position, setPosition] = useState<LatLngExpression>([+lat, +long]);

  useEffect(() => {
    setPosition([+lat, +long]);
  }, [lat, long]);

  return (
    <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        className="size-full"
      >
        <MyMapComponent position={position} countryInfo={countryInfo} />
      </MapContainer>
  )
}

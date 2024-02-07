"use client";

import { CountryApiGraphQlResponse } from "@/types";
import dynamic from "next/dynamic";

// Lazy load the map component to prevent SSR issues related to window object
const Map = dynamic(() => import('./Map'), { ssr: false })

interface Props {
  lat: number;
  long: number;
  countryInfo: string;
}

export default function LeafletMapWrapper({ lat, long, countryInfo }: Props) {
  const parsedCountryInfo: CountryApiGraphQlResponse = JSON.parse(countryInfo);
  

  return (
    <div className="h-full overflow-hidden md:rounded-2xl">
      <Map lat={lat} long={long} countryInfo={parsedCountryInfo} />
    </div>
  );
}

'use client'

import dynamic from 'next/dynamic'

import { CountryApiGraphQlResponse } from '@/types'

// Lazy load the map component to prevent SSR issues related to window object
const Map = dynamic(() => import('./Map'), { ssr: false })

interface Props {
  lat: number
  long: number
  countryInfo: string
}

export default function LeafletMapWrapper({ lat, long, countryInfo }: Props) {
  const parsedCountryInfo: CountryApiGraphQlResponse = JSON.parse(countryInfo)

  return (
    <div className="h-full overflow-hidden md:rounded-2xl">
      <Map countryInfo={parsedCountryInfo} lat={lat} long={long} />
    </div>
  )
}

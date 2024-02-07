import Image from 'next/image'

import Greeting from '@/components/Greeting'
import Header from '@/components/Header'
import LeafletMapWrapper from '@/components/Leaflet/LeafletMapWrapper'
import SelectCountry from '@/components/SelectCountry'
import api from '@/lib/api'
import { type CountryApiGraphQlResponse } from '@/types'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function Home({ searchParams }: Props) {
  // get the country code from the query params
  const paramCountry = searchParams.country

  // get the list of countries from the stored file
  const countries = await api.countries.getAll()

  // get the country info from the API
  const result: CountryApiGraphQlResponse =
    paramCountry && (await api.countries.getByCode(paramCountry))

  // if there are no selected country, we'll show a message
  const selectedCountry = paramCountry
    ? countries.find((c) => c.isoCode === paramCountry)
    : undefined

  return (
    <main className="min-h-screen max-lg:flex max-lg:flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center">
      <section className="z-0 size-full max-lg:h-[50vh] lg:py-16">
        {selectedCountry ? (
          <LeafletMapWrapper
            countryInfo={JSON.stringify(result)}
            lat={selectedCountry.latitude}
            long={selectedCountry.longitude}
          />
        ) : (
          <div className="relative size-full overflow-hidden lg:rounded-2xl">
            <Image
              fill
              alt="Happy world map"
              className="object-cover"
              src={'/happy-world-map.webp'}
            />
          </div>
        )}
      </section>

      <section className="flex h-full flex-col items-center justify-center max-lg:h-[50vh]">
        <Header />

        <SelectCountry countries={countries} />

        {selectedCountry && (
          <div className="mt-8">
            <Greeting emoji={result.emoji} selectedCountry={selectedCountry} />
          </div>
        )}
      </section>
    </main>
  )
}

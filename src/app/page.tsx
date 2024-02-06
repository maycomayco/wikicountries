import Greeting from "@/components/Greeting";
import Header from "@/components/Header";
import LeafletMapWrapper from "@/components/LeafletMapWrapper";
import SelectCountry from "@/components/SelectCountry";
import api from "@/lib/api";
import { type CountryApiResponse } from "@/types";
import Image from "next/image";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  // get the country code from the query params
  const paramCountry = searchParams.country;

  // get the list of countries from the stored file
  const countries = await api.countries.getAll();

  // get the country info from the API
  const result: CountryApiResponse =
    paramCountry && (await api.countries.getByCode(paramCountry));

  // if there are no selected country, we'll show a message
  const selectedCountry = paramCountry
    ? countries.find((c) => c.isoCode === paramCountry)
    : undefined;

  return (
    <main className="min-h-screen max-lg:flex max-lg:flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center">
      <section className="z-0 size-full max-lg:h-[50vh] lg:py-16">
        {selectedCountry ? (
          <LeafletMapWrapper
            lat={selectedCountry.latitude}
            long={selectedCountry.longitude}
            countryInfo={JSON.stringify(result)}
          />
        ) : (
          <div className="relative size-full overflow-hidden lg:rounded-2xl">
            <Image
              src={"/happy-world-map.webp"}
              alt="Happy world map"
              fill
              className="object-cover"
            />
          </div>
        )}
      </section>

      <section className="flex h-full flex-col items-center justify-center max-lg:h-[50vh]">
        <Header />

        <SelectCountry countries={countries} />

        {selectedCountry && (
          <div className="mt-8">
            <Greeting selectedCountry={selectedCountry} emoji={result.emoji} />
          </div>
        )}
      </section>
    </main>
  );
}

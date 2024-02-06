import Greeting from "@/components/Greeting";
import Header from "@/components/Header";
import LeafletMapWrapper from "@/components/LeafletMapWrapper";
import SelectCountry from "@/components/SelectCountry";
import api from "@/lib/api";
import { type CountryApiResponse } from "@/types";

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
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <section className="flex flex-col items-center z-0 w-full py-4 gap-4">
        {selectedCountry ? (
          <>
            <Greeting selectedCountry={selectedCountry} emoji={result.emoji} />

            <LeafletMapWrapper
              lat={selectedCountry.latitude}
              long={selectedCountry.longitude}
              countryInfo={JSON.stringify(result)}
            />
          </>
        ) : (
          <h2>Selecciona un pais de la lista</h2>
        )}
      </section>
    </main>
  );
}

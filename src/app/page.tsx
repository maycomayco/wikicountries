import Greeting from "@/components/Greeting";
import LeafletMapWrapper from "@/components/LeafletMapWrapper";
import SelectCountry from "@/components/SelectCountry";
import { getCountryByCode } from "@/data/getCountryData";
import api from "@/lib/api";
import { CountryApiResponse } from "@/types";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  const paramCountry = searchParams.country;
  const countries = await api.countries.get();

  const result: CountryApiResponse =
    paramCountry && (await getCountryByCode(paramCountry));

  const selectedCountry = paramCountry
    ? countries.find((c) => c.isoCode === paramCountry)
    : undefined;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex items-center z-10 flex-col w-full p-4 gap-4">
        <h1 className="text-xl font-bold">Selecciona un pais</h1>
        <SelectCountry countries={countries} />
      </div>

      <div className="flex flex-col items-center z-0 w-full py-4 gap-4">
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
      </div>
    </main>
  );
}

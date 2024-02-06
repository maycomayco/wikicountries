import Greeting from "@/components/Greeting";
import LeafletMapWrapper from "@/components/LeafletMapWrapper";
import SelectCountry from "@/components/SelectCountry";
import api from "@/lib/api";
import { getClient } from "@/lib/apollo.client";
import { CountryApiResponse } from "@/types";
import { gql } from "@apollo/client";

async function getData(countryCode: string) {
  if (!countryCode) return null;

  try {
    const { data } = await getClient().query({
      query: gql`
        query getCountryByCode($code: ID!) {
          country(code: $code) {
            name
            capital
            emoji
            currency
            awsRegion
          }
        }
      `,
      variables: { code: countryCode },
    });

    return data.country;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos del pais");
  }
}

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  const paramCountry = searchParams.country;
  const countries = await api.countries.get();

  const result: CountryApiResponse =
    paramCountry && (await getData(paramCountry));

  const selectedCountry = paramCountry
    ? countries.find((c) => c.isoCode === paramCountry)
    : undefined;

  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <div className="flex gap-4 items-center z-10 flex-col w-full bg-black/5 p-4">
        <h1 className="text-xl font-bold">Selecciona un pais</h1>
        <SelectCountry countries={countries} />
      </div>

      <div className="flex flex-col items-center z-0 gap-4 w-full">
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

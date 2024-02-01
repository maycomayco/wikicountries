import LeafletMapWrapper from "@/components/LeafletMapWrapper";
import SelectCountry from "@/components/SelectCountry";
import api from "@/lib/api";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  const paramCountry = searchParams.country;
  const countries = await api.countries.get();

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
        {/* <p>{JSON.stringify(selectedCountry)}</p> */}

        {selectedCountry?.latitude && selectedCountry?.longitude ? (
          <LeafletMapWrapper
            lat={selectedCountry.latitude}
            long={selectedCountry.longitude}
          />
        ) : (
          <h2>Selecciona un pais de la lista</h2>
        )}
      </div>
    </main>
  );
}

import api from "@/lib/api";
import SelectCountry from "./SelectCountry";

export default async function Header() {
  // this fetch will be dedupe by Next
  const countries = await api.countries.getAll();

  return (
    <header className="flex items-center z-10 flex-col w-full p-4 gap-4">
      <h1 className="text-xl font-bold">Selecciona un pais</h1>
      <SelectCountry countries={countries} />
    </header>
  );
}

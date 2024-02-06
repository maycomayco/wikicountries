import countries from "@/data/countries.json";
import { getCountryByCode } from "@/data/getCountryData";
import { Country } from "@/types";

function transformCountries(countries: any[]): Country[] {
  return countries.map((country: any) => {
    return {
      name: country.Country,
      isoCode: country["ISO Code"],
      latitude: country.Latitude,
      longitude: country.Longitude,
    };
  });
}

const api = {
  countries: {
    getAll: async () => {
      return transformCountries(countries);
    },
    getByCode: async (code: string) => getCountryByCode(code),
  },
};

export default api;

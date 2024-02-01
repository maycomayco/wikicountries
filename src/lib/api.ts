import countries from "@/countries.json";
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
    get: async () => {
      return transformCountries(countries);
    },
  },
};

export default api;

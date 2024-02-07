import countries from '@/data/countries.json'
import { getCountryByCode } from '@/data/getCountryData'
import { type Country } from '@/types'

export interface CountryMockFile {
  Country: string
  'ISO Code': string
  Latitude: number
  Longitude: number
}

/**
 * Transforms an array of countries into an array of Country objects.
 * @param countries - The array of countries to transform.
 * @returns An array of Country objects.
 */
function transformCountries(countries: CountryMockFile[]): Country[] {
  const transformedCountries = countries.map((country: any) => {
    return {
      name: country.Country,
      isoCode: country['ISO Code'],
      latitude: country.Latitude,
      longitude: country.Longitude,
    }
  })

  const sortedCountries = transformedCountries.sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  return sortedCountries
}

/**
 * API object for accessing country data.
 */
const api = {
  countries: {
    /**
     * Get all countries.
     * @returns {Promise<Country[]>} A promise that resolves to an array of countries.
     */
    getAll: async () => {
      return transformCountries(countries)
    },
    /**
     * Get a country by its code.
     * @param {string} code - The country code.
     * @returns {Promise<Country>} A promise that resolves to the country object.
     */
    getByCode: async (code: string) => getCountryByCode(code),
  },
}

export default api

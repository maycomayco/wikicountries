export interface Country {
  name: string
  isoCode: string
  latitude: number
  longitude: number
}

export interface CountryApiGraphQlResponse {
  __typename: string
  name: string
  capital: string
  emoji: string
  currency: string
  awsRegion: string
}

export interface LeafletProps {
  lat: number
  long: number
  countryInfo: CountryApiGraphQlResponse
}

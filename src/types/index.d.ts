export interface Country {
  name: string;
  isoCode: string;
  latitude: number;
  longitude: number;
}

export interface CountryApiResponse {
  __typename: string;
  name: string;
  capital: string;
  emoji: string;
  currency: string;
  awsRegion: string;
}

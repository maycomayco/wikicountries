import { getClient } from "@/lib/apollo.client";
import { gql } from "@apollo/client";

export async function getCountryByCode(countryCode: string) {
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

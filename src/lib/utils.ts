import qs from 'query-string'

type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

/**
 * Forms a URL query string by adding or updating a key-value pair in the existing query parameters. Detects the current URL, check what we have and skip everything and only updates what we need the key ('q') query parameter.
 * @param params - The current URL query parameters.
 * @param key - The key of the query parameter to add or update.
 * @param value - The value of the query parameter to add or update to the key value.
 * @returns The updated URL query string.
 */
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }, // skipNull removes any query params that are null
  )
}

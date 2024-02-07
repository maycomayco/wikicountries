import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

// registerApolloClient will return a getClient function that allows you to safely get an instance of the Apollo Client that’s scoped to the current request, so you won’t end up sharing the Apollo Client cache within multiple requests.
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(), // se utilizara la memoria para las solicitudes de datos
    link: new HttpLink({
      uri: process.env.API_COUNTRIES,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  })
})

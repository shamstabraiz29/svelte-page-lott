import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: `${import.meta.env.VITE_PUBLIC_API_URL}/graphql`,
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    }
  },
});

export default client;

export const updateClientWithIdToken = (idToken?: string) => {
  const newHttpLink = new HttpLink({
    uri: `${import.meta.env.VITE_PUBLIC_API_URL}/graphql`,
    headers: idToken
      ? {
          Authorization: `Bearer ${idToken}`,
        }
      : {},
  });

  client.setLink(newHttpLink);
};

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Update if deployed
  cache: new InMemoryCache(),
});

export default client;
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import React from "react";

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8000/graphql",
    }),
    cache: new InMemoryCache(),
});

const ApolloProviderWrapper: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
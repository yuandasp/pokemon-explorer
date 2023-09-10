"use client";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const Providers = ({ children }) => {
  const client = new ApolloClient({
    uri: "https://graphqlpokemon.favware.tech/v7",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

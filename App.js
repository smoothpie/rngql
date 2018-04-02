import React from 'react';
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";
import Main from './app/components/Main';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjfi6xcze574p014283hw9upd'
  }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
	    <ApolloProvider client={client}>
        <Main />
	    </ApolloProvider>
    );
  }
}

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import './App.css';

const client = new ApolloClient({
  uri: process.env.SERVER_URL,
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div />
  </ApolloProvider>
);


export default App;

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './services/ApolloClient';
import './App.css';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div />
  </ApolloProvider>
);


export default App;

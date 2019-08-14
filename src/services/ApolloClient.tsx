import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_SERVER_URL,
});

cache.writeData({
  data: {
    id: '',
    user: '',
    email: '',
    roadmaps: [],
  },
});

export default client;

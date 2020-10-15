import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000', fetch }),
  cache: new InMemoryCache()
});

const getPlaces = gql`
  query {
    getOffersNearby(
      location: { type: "Point", coordinates: [-73.98241999999999, 40.579505] }
    ) {
      name
    }
  }
`;

export { client, getPlaces };

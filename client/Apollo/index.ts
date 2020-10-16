import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.1.117:4000', fetch }),
  cache: new InMemoryCache()
});

const getPlaces = gql`
  query($location: Point!) {
    getOffersNearby(location: $location) {
      id
      name
      location
      image
      offers {
        consumableType
        offerType
        start
        end
        repeat
        repeatEvery
        description
        score
        available
      }
    }
  }
`;

// This goes under name in the query

export { client, getPlaces };

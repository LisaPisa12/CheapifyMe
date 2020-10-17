import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000', fetch }),
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

const insertOffer = gql`
  mutation insertOffer($id: String, $offers: OffersInput) {
    id
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
`;

// This goes under name in the query

export { client, getPlaces, insertOffer };

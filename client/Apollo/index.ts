import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphql', fetch }),
  cache: new InMemoryCache(),
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
  mutation InsertOffer(
    $id: String
    $name: String!
    $address: String
    $location: Point!
    $offer: [OfferInput]!
  ) {
    insertOffer(
      id: $id
      name: $name
      address: $address
      location: $location
      offer: $offer
    ) {
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

const voteOffer = gql`
  mutation VoteOffer($id: String!, $offer: [VoteInput]!) {
    voteOffer(id: $id, offer: $offer) {
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
  }
`;

// This goes under name in the query

export { client, getPlaces, insertOffer, voteOffer };

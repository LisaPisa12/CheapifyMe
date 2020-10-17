export default `
scalar Point

type Places {
    id:String!
    name: String!
    location:Point!
    image: String
    zipCode: Int
    offers: [Offer]!
  }

  type Offer {
    id:String!
    consumableType: String!
    offerType: String!
    start: String!
    end: String!
    repeat: Boolean!
    repeatEvery: String!
    description: String!
    score: Int!
    available: Boolean!
  }

  input OfferInput {
    consumableType: String
    offerType: String
    start: String
    end: String
    repeat: Boolean
    repeatEvery: String
    description: String
    score: Int
    available: Boolean
  }
`;

// type Coordinates{
//   lat:Float!
//   lon:Float!
// }

// input CoordinatesInput {
//   lat:Float!
//   lon:Float!
// }

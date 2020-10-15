export default `
scalar Point

type Places {
    id:String!
    name: String!
    location:Point!
    image: String
    zipCode: Int
    offers: [Offers]!
  }

  type Offers {
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

  input OffersInput {
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

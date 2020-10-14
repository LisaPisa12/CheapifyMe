export default `
scalar Point

type Location {
    name: String!
    location:Point!
    image: String
    zipCode: Int
    offers: [OffersId]!
  }

  type OffersId {
    id:Int!
    consumableType: String
    offerType: String
    start: String
    end: String
    repeat: Boolean
    repeatEvery: String
    description: String
    score: Int
    active: Boolean
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

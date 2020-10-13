export default `

type Location {
    name: String!
    location:[Coordinates]!
    image: String
    zipCode: Int
    offers: [OffersId]!
  }

  type Coordinates {
    type: String
    coordinates: Int 
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

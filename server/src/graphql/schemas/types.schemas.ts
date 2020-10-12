export default `
  
type Locations {
    name: String!
    location:[Location]!
    image: String
    zipCode: Number
    offers: [offersId]!
  }

  type Location {
    type: String
    coordinates: Number //to be revised, dont thins its's correct
  }
  
  type offersId {
    id:Int!
    consumableType: String
    offerType: String
    start: String
    end: String
    repeat: Boolean
    repeatEvery: String
    description: String
    score: Number
    active: Boolean
  }
  
`;

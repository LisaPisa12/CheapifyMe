export default `

type Mutation {
  insertOffer( 
    id: String!
    offers:[OffersInput]!
    ):Places 

  voteOffer(
    id:String!
    offers:[OffersInput]!
    ):Places 

  insertNewRestaurant(
    id: String!
    name: String!
    location:Point!
    zipCode: Int
    ):Places  
}
`;

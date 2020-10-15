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
}

`;

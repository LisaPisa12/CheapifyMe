export default `

type Mutation {
  voteOffer(
    id:String!
    offer:[OfferInput]!
    ):Places 

    insertOffer(
    id: String
    name: String!
    location:Point!
    offer:[OfferInput]!
    ):Places  
}
`;

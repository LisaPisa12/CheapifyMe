export default `

type Mutation {
  voteOffer(
    id:String!
    offer:[VoteInput]!
    ):Places 

    insertOffer(
    id: String
    name: String!
    location:Point!
    address:String
    offer:[OfferInput]!
    ):Places  
}
`;

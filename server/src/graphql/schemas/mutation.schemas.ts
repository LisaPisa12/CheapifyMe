export default `

type Mutation {
  voteOffer(
    id:String!
    offer:[OffersInput]!
    ):Places 

    insertOffer(
    id: String
    name: String!
    location:Point!
    offer:[OffersInput]!
    ):Places  
}
`;

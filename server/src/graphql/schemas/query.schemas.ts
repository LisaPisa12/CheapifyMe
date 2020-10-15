export default `
type Query {
  getOffersNearby(location:Point!): [Places]
}`;

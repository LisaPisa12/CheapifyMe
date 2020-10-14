export default `
type Query {
  getNearOffersNearby(location:Point!): [Location]
}`;

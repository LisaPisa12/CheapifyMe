export default `
type Query {
  getNearOffersByZip(zipcode: Int): [Location]
}`;

module.exports = `
type Query {
  getNearOffersByZip(zipcode:String):[Locations],
}`;

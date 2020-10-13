import db from '../../models/locations';

export default {
  getNearOffersByZip: async (_: any, { zipcode }: any) => {
    await db.Location.find({ zipcode: { $eq: zipcode } });
  },
};

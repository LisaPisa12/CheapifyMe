import { Location } from '../../models/locations';

export default {
  insertOffer: async (_: any, { id, offers }: any) => {
    try {
      const offerAtLocation = await Location.findById(id);
      if (offerAtLocation) {
        offerAtLocation.offers.push(...offers);
        offerAtLocation.save();
        console.log(offerAtLocation);
        return offerAtLocation;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

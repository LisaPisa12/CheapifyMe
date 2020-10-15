import { Location } from '../../models/locations';

export default {
  insertOffer: async (_: any, { id, offers }: any) => {
    try {
      const offerAtLocation = await Location.findById(id);
      if (offerAtLocation) {
        offerAtLocation.offers.push(...offers);
        offerAtLocation.save();
        return offerAtLocation;
      }
    } catch (error) {
      console.log(error);
    }
  },

  voteOffer: async (_: any, { id, offers }: any) => {
    try {
      const placeWithOffer = await Location.findById(id);
      if (placeWithOffer) {
        placeWithOffer.offers.forEach((element) => {});
      }
    } catch (error) {
      console.log(error);
    }
  },
};

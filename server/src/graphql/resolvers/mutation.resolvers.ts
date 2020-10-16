import { Place } from '../../models/places';

export default {
  insertOffer: async (_: any, { id, offers }: any) => {
    try {
      const offerAtLocation = await Place.findById(id);
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
      const placeWithOffer = await Place.findById(id);
      if (placeWithOffer) {
        // placeWithOffer;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

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

  // not finished
  voteOffer: async (_: any, { id, offers }: any) => {
    try {
      const placeWithOffer = await Place.findById(id);
      if (placeWithOffer) {
      }
    } catch (error) {
      console.log(error);
    }
  },

  insertNewRestaurant: async (_: any, { name, location }: any) => {
    try {
      const newRestaurant = await Place.findOne({ name: name });
      if (!newRestaurant) {
        //  Place.save(name, location);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

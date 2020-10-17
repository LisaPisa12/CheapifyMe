import {  Place } from '../../models/places';

export default {
  // insertOffer: async (_: any, { id, offers }: any) => {
  //   try {
  
  //     const offerAtLocation = await Place.findById(id);
  //     if (offerAtLocation) {
  //       offerAtLocation.offers.push(...offers);
  //       offerAtLocation.save();

  //       return offerAtLocation;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  voteOffer: async (_: any, { id, offerType }: any) => {
    try {
      const placeWithOffer = await Place.findById(id);
    
      if (placeWithOffer) {
        const condition= {"Place.offers.$.offerType":offerType};
       Place.updateOne(condition, {$inc:{score:1}});
      }
    } catch (error) {
      console.log(error);
    }
  },

  insertOffer: async (_: any, { id, name, location, offer }: any) => {
    try {
     
      const place = await Place.findById(id);
      if (!place) {
        const newPlace = new Place({name, location, offers:offer})
        newPlace.save(); 
         return newPlace;  
      }else{
        place.offers.push(...offer);
        place.save();
        return place;

      }
    } catch (error) {
      console.log(error);
    }
  },
};

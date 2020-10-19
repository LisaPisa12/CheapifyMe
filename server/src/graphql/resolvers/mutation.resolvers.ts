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

  voteOffer: async (_: any, { id, offer }: any) => {
    try {
      const placeWithOffer = await Place.findById(id);
    
      if (placeWithOffer) {
        placeWithOffer.offers.forEach(el => {
          if(el.id === offer[0].id) el.score+=offer[0].score;
          if(el.score === -1) el.available = false
        });
        placeWithOffer.save();
        return placeWithOffer;
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

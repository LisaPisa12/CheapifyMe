import { UserInputError } from 'apollo-server';
import {  Place } from '../../models/places';

export default {

  voteOffer: async (_: any, { id, offer }: any) => {
    try {
      const placeWithOffer = await Place.findById(id);
    
      if (placeWithOffer) {
        placeWithOffer.offers.forEach(el => {
          if(el.id === offer[0].id) el.score+=offer[0].score;
          if(el.score === -25) el.available = false
        });
        placeWithOffer.save();
        return placeWithOffer;
      }
      
    } catch (error) {
      console.log(error);
    }
  },

  insertOffer: async (_: any, { id, name, location, address, offer }: any) => {
    try {
     
      const place = await Place.findById(id);
      if (!place) {
        const newPlace = new Place({name, location, address, offers:offer})
        newPlace.save(); 
         return newPlace;  
      }else{
        place.offers.push(...offer);
        place.save();
        return place;

      }
    } catch (error) {
      throw new UserInputError('You must provide the all the information required');
    }
  },
};

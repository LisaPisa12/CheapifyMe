import { Place } from '../../models/places';
// @ts-ignore

interface Point {
  type: String;
  coordinates: [Number, Number];
}


  // need to refactor to use $and 
  // { offers: {available:true} } // works with id but not with array of offers
export default {
  getOffersNearby: async (_: any, { location }: { location: Point }) => {
    try {
      const nearbyPlaces = await Place.find({ location: {
          $geoWithin: {
            $centerSphere: [
              [location.coordinates[0], location.coordinates[1]],
              2 / 3963.2,
            ],
          },
        },
      },
   
      );
      const availableOffers = nearbyPlaces.map(element => {
        const offers = element.offers.filter(item => item.available===true)
        element.offers = [...offers];
        return element;
      });
      
      return availableOffers;

    } catch (err) {
      console.log(err);
    }
  },
};

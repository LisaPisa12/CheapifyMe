import { Place } from '../../models/places';
// @ts-ignore

interface Point {
  type: String;
  coordinates: [Number, Number];
}

export default {
  getOffersNearby: async (_: any, { location }: { location: Point }) => {
    try {
      const nearbyPlaces = await Place.find({$and:
        [{ location: {
          $geoWithin: {
            $centerSphere: [
              [location.coordinates[0], location.coordinates[1]],
              2 / 3963.2,
            ],
          },
        },
      },
       // { offers: {available:true} } // works with id but not with array of offers
      ]});
      

      const availableOffers = nearbyPlaces.map(element => {
        const offers = element.offers.filter(item => item.available===true)
        element.offers = [...offers];
        return element;
      })
      
      
      return availableOffers;

      
    } catch (err) {
      console.log(err);
    }
  },
};

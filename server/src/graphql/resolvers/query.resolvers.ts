import { Location } from '../../models/locations';
// @ts-ignore

interface Point {
  type: String;
  coordinates: [Number, Number];
}

export default {
  getNearOffersNearby: async (_: any, { location }: { location: Point }) => {
    try {
      console.log(location);

      const nearbyPlaces = await Location.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [location.coordinates[0], location.coordinates[1]],
              2 / 3963.2,
            ],
          },
        },
      });
      console.log(nearbyPlaces);

      return nearbyPlaces;
    } catch (err) {
      console.log(err);
    }
  },
};

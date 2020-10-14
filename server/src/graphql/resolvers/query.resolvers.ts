import db from '../../models/locations';
// @ts-ignore

interface Point {
  type: String;
  coordinates: [Number, Number];
}

export default {
  getNearOffersNearby: async (_: any, location: Point) => {
    try {
      const nearbyPlaces = await db.Location.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [location.coordinates[0], location.coordinates[1]],
              2 / 3963.2,
            ],
          },
        },
      });
      return nearbyPlaces;
    } catch (e) {}
  },
};

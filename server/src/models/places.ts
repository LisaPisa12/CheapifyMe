import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IOffer extends mongoose.Document {
  consumableType: String;
  offerType: String;
  start: String;
  end: String;
  repeat: Boolean;
  repeatEvery: String;
  description: String;
  score: Number;
  available: Boolean;
}

interface IPlace extends mongoose.Document {
  name: String; // needs to be iunique. not now bc it will fuckup mock data queries
  zipcode: Number;
  location: {
    type: {
      type: String;
      enum: ['Point'];
      required: true;
    };
    coordinates: [Number, Number];
    // need to set a range of values for the coords -180-180, -90-90
  };
  image: String;
  offers: [IOffer];
}

const offerSchema = new Schema({
  consumableType: String,
  offerType: String,
  start: String,
  end: String,
  repeat: Boolean,
  repeatEvery: String,
  description: String,
  score: Number,
  available: Boolean
});

const placeSchema = new Schema({
  name: String, // needs to be iunique. not now bc it will fuckup mock data queries
  zipcode: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: [Number, Number]
    // need to set a range of values for the coords -180-180, -90-90
  },
  image: String,
  offers: [offerSchema]
});

const Place = mongoose.model<IPlace>('Place', placeSchema);
const Offer = mongoose.model<IOffer>('Offer', offerSchema);

export { Place, Offer };

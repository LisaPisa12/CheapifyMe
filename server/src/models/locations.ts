import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  consumableType: String,
  offerType: String,
  start: String,
  end: String,
  repeat: Boolean,
  repeatEvery: String,
  description: String,
  score: Number,
  available: Boolean,
});

const locationSchema = new Schema({
  name: String, // needs to be iunique. not now bc it will fuckup mock data queries
  zipcode: Number,
  location: {
    coordinates: [Number, Number],
    // need to set a range of values for the coords -180-180, -90-90
  },
  image: String,
  offers: [offerSchema],
});

const Location = mongoose.model('Location', locationSchema);
const Offer = mongoose.model('Offer', offerSchema);

export { Location, Offer };

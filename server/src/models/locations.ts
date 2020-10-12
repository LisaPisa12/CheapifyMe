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
  active: Boolean,
});

const locationSchema = new Schema({
  name: String,
  zipcode: Number,
  location: {
    type: String,
    coordinates: [Number],
  },
  image: String,
  offers: [offerSchema],
});

module.exports = mongoose.model('Locations', locationSchema);

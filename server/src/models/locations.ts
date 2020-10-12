import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  location: {
    type: String,
    coordinates: [Number],
  },
  image: String,
  offers: {
    id: {
      consumableType: String,
      offerType: String,
      start: String,
      end: String,
      repeat: Boolean,
      repeatEvery: String,
      description: String,
      score: Number,
      active: Boolean,
    },
  },
});

module.exports = mongoose.model('Locations', locationSchema);

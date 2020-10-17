import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IOffer extends mongoose.Document {
  consumableType: String;
  offerType: String;
  start: String;
  end?: String ;
  repeat?: Boolean;
  repeatEvery?: String;
  description: String;
  score: Number;
  available: Boolean;
}

interface IPlace extends mongoose.Document {
  name: String; // needs to be iunique. not now bc it will fuckup mock data queries
  zipcode?: Number;
  location: {
    type: {
      type: String;
      enum: ['Point'];
      required: true;
    };
    coordinates:[  
                  {type:Number, required:true, min:-90, max:90}, 
                  {type:Number, required:true, min:-180, max:180},
                ];

  };
  image?: String;
  offers: [IOffer];
}

const offerSchema = new Schema({
  consumableType:
  {
    type: String,
    required:true
  },
  offerType: {
    type: String,
    required:true,
    unique:true
  },
  start: {
    type: String,
    required:true
  },
  end: String,
  repeat: {
    type: Boolean,
   // required:true
  },
  repeatEvery: String,
  description: {
    type: String,
   // required:true
  },
  score: {
    type: Number,
    required:true,
    default:0
  },
  available: {
    type: Boolean,
    required:true,
    default:true
  },
});

const placeSchema = new Schema({
  name:  {
    type: String,
    unique : true, 
    required : true, 
  },
  zipcode: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: [
                  {type:Number, required:true, min:-90, max:90}, 
                  {type:Number, required:true, min:-180, max:180},
                ],
  },
  image: String,
  offers: [offerSchema],
});

const Place = mongoose.model<IPlace>('Place', placeSchema);
const Offer = mongoose.model<IOffer>('Offer', offerSchema);

export { Place, Offer };

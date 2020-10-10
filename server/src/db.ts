import { default as mongodb } from 'mongodb';

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(function (err) {
  console.log('MONGOdb connected');
  const db = client.db('cheapifyme');
});

import { ApolloServer } from 'apollo-server';
// eslint-disable-next-line import/no-duplicates
import mongoose from 'mongoose';
import { Place, Offer } from './models/places';
// eslint-disable-next-line import/no-duplicates
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';

require('dotenv').config();

mongoose
  .connect('mongodb://localhost:27017/cheapifyme', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('--->error while connecting with graphql ', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: { path: '/cheapifyme' },
  context: async () => {
    return { db: { Place, Offer } };
  }
});

const PORT = 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
export default server;

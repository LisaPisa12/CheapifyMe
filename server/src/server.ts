import { ApolloServer, gql } from 'apollo-server';
import { Db, MongoClient } from 'mongodb';

require('dotenv').config();

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

let db: Db;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: { path: '/cheapifyme' },
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_DB_URI!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db('cheapifyme'); // database name
      } catch (error) {
        console.log(
          '--->error while connecting with graphql context (db)',
          error
        );
      }
    }

    return { db };
  },
});

// const PORT = 3001;
// server.listen({ port: PORT }).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
export default server;

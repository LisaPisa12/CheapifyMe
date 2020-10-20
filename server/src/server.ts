import { ApolloServer, UserInputError } from 'apollo-server-express';
import fs from 'fs'
import https from 'https'
import http from 'http'
import express from 'express'
// eslint-disable-next-line import/no-duplicates
import mongoose from 'mongoose';
import { Place, Offer } from './models/places';
// eslint-disable-next-line import/no-duplicates
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';

require('dotenv').config();

const configurations:any = {
  production: { ssl: true, port: 5001, hostname: 'localhost' },
  development: { ssl: false, port: 5000, hostname: 'localhost' }
}


const environment = process.env.NODE_ENV || 'development';
const config = configurations[environment];

mongoose
  .connect('mongodb://localhost:27017/cheapifyme', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('--->error while connecting with graphql ', err));

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: { path: '/cheapifyme' },
  context: async () => {
    return { db: { Place, Offer } };
  }
});


const app = express();
apollo.applyMiddleware({app});


var server: http.Server | https.Server;

if(config.ssl){
  server = https.createServer({
      key: fs.readFileSync(`./ssl/server.key`),
      cert: fs.readFileSync(`./ssl/server.crt`)
  }, app);
} else{
  server = http.createServer(app);
}


server.listen({ port: config.port }, () => {
  console.log(
    '🚀  Server ready at ',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
    );
});
export default server;

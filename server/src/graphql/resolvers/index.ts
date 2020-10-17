import query from './query.resolvers';
import types from './types.resolvers';
import Mutation from './mutation.resolvers';

const resolvers = {
  Query: query,
  ...types,

  Mutation,
};

export default resolvers;

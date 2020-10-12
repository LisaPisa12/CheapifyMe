import query from './query.resolvers';
import mutation from './mutation.resolvers';
import types from './types.resolvers';

const resolvers = {
  Query: query,
  ...types,
};

module.exports = resolvers;

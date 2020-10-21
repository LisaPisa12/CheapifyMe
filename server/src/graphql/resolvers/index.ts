import Query from './query.resolvers';
import Types from './types.resolvers';
import Mutation from './mutation.resolvers';

const resolvers = {
  Query,
  ...Types,
  Mutation,
};

export default resolvers;

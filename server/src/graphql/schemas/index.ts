import { gql } from 'apollo-server';

import query from './query.schemas';
import mutation from './mutation.schemas';
import types from './types.schemas';

export default gql`
  ${query}
  ${mutation}
  ${types}
`;

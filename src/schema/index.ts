import loMerge from 'lodash/merge';
import { gql, makeExecutableSchema } from 'apollo-server-lambda';
import { DateTimeResolver } from 'graphql-scalars';
import { Resolvers } from '../type-generator';
import { User, UserResolver } from './User';
import { Post, PostResolver } from './Post';
import { Topic, TopicResolver } from './Topic';
import { AuthDirective } from '../directives/AuthDirective';

const typeDefs = gql`
  scalar DateTime
  directive @auth on OBJECT | FIELD_DEFINITION

  type Query {
    ok: Boolean!
  }

  type Mutation {
    ok: Boolean!
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    ok: () => true,
  },
  Mutation: {
    ok: () => true,
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, User, Post, Topic],
  resolvers: loMerge(resolvers, UserResolver, PostResolver, TopicResolver),
  schemaDirectives: {
    auth: AuthDirective,
  },
});

export default schema;

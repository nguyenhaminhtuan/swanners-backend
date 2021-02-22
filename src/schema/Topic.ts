import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const Topic = gql`
  type Topic {
    id: ID!
    name: String!
    children: [Topic!]
  }

  extend type Query {
    topics(first: Int = 10): [Topic!]
  }

  extend type Mutation {
    followTopic(topicId: ID!): Topic @auth
    unfollowTopic(topicId: ID!): Topic @auth
  }
`;

export const TopicResolver: Resolvers = {
  Topic: {
    children: (root, args, ctx) => {
      return ctx.db.topic.findUnique({ where: { id: root.id } }).children();
    },
  },
  Query: {
    topics: (root, args, ctx) => {
      return ctx.db.topic.findMany({
        where: { isActived: true },
        take: args.first,
      });
    },
  },
  Mutation: {
    followTopic: (root, args, ctx) => {
      return ctx.db.topic.update({
        where: { id: args.topicId },
        data: { followers: { connect: { id: ctx.user.sub } } },
      });
    },
    unfollowTopic: (root, args, ctx) => {
      return ctx.db.topic.update({
        where: { id: args.topicId },
        data: { followers: { disconnect: { id: ctx.user.sub } } },
      });
    },
  },
};

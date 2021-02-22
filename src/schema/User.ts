import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const User = gql`
  enum UserStatus {
    ENABLED
    DISABLED
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String
    fullName: String!
    avatarUrl: String
    coverPicUrl: String
    status: UserStatus!
    isVerified: Boolean!
    disabledAt: DateTime
    lastLoginAt: DateTime
    profile: Profile!
    posts: [Post!]
    followingTopics: [Topic!]
  }

  type Profile {
    bio: String!
    gender: Gender
    birthDay: DateTime
    phone: String
  }

  extend type Query {
    me: User @auth
  }
`;

export const UserResolver: Resolvers = {
  User: {
    posts: async (root, args, ctx) => {
      const posts = await ctx.db.user
        .findUnique({
          where: { id: root.id },
        })
        .posts();

      return posts;
    },
    followingTopics: (root, args, ctx) => {
      return ctx.db.user
        .findUnique({ where: { id: root.id } })
        .followingTopics();
    },
  },
  Query: {
    me: async (root, args, ctx) => {
      return ctx.db.user.findUnique({
        where: { id: ctx.user.sub },
        include: { profile: true },
      });
    },
  },
};

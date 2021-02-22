import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const Post = gql`
  enum PostStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type Post {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: String!
    coverPicUrl: String
    status: PostStatus!
    user: User!
    topics: [Topic!]
  }

  input CreateDraftInput {
    content: String = ""
  }

  input PublishPostInput {
    content: String!
  }

  extend type Query {
    post(postId: ID!): Post
  }

  extend type Mutation {
    createDraft(input: CreateDraftInput!): Post @auth
    publishPost(input: PublishPostInput!): Post @auth
  }
`;

export const PostResolver: Resolvers = {
  Post: {},
};

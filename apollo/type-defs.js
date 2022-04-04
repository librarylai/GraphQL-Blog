import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
    posts: [Post]
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
  }
  type Comment {
    id: ID!
    postID: ID!
    content: String
  }
  type Mutation {
    addPost(title: String, content: String, authorId: ID): [Post]
    deletePost(postId: ID): [Post]
    updatePost(postId: ID, title: String, content: String, authorId: ID): [Post]
  }

  type Query {
    viewer: User
    viewAllPost: [Post]
    viewPost(postId: ID): Post
  }
  type Subscription {
    commentAdded(postId: ID): Comment
  }
`

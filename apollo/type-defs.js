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
  type Mutation {
    addPost(title: String, content: String): Post
    deletePost(postId: ID):Post
    updatePost(postId: ID,title: String, content: String):Post
  }

  type Query {
    viewer: User
    viewAllPost: [Post]
    viewPost(postId: ID): Post
  }
`

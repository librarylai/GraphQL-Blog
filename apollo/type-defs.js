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
    comment: String
  }
  type Mutation {
    # 增加文章
    addPost(title: String, content: String, authorId: ID): [Post]
    # 刪除文章
    deletePost(postId: ID): [Post]
    # 更新文章
    updatePost(postId: ID, title: String, content: String, authorId: ID): [Post]
    # 增加評論
    addComment(postId: ID, comment: String, authorId: ID):[Comment]
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

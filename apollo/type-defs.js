import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
    posts: [Post]
    notifications: [Notification]
    sortNotifications: [Notification]
  }
  type Notification {
    id: ID
    content: Content # 故意分出一個 Content 的 type 來增加複雜度
  }
  type Content {
    title: String
    subTitle: String
    createTime: String
    isRead: Boolean
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
  type Result {
    status: Boolean
  }
  type Mutation {
    # 增加文章
    addPost(title: String, content: String, authorId: ID): [Post]
    # 刪除文章
    deletePost(postId: ID): [Post]
    # 更新文章
    updatePost(postId: ID, title: String, content: String, authorId: ID): [Post]
    # 增加評論
    addComment(postId: ID, comment: String, authorId: ID): [Comment]
    # 更新通知
    updateNotification(notificationId: ID): Result
  }

  type Query {
    viewer: User
    viewAllPost: [Post]
    viewPost(postId: ID): Post
    user: User
  }
`

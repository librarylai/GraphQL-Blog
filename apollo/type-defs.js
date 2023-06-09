import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    "ID 不能為空"
    id: ID!
    "user 名稱"
    name: String!
    "使用這狀態"
    status: String!
    "文章"
    posts: [Post]
    "通知"
    notifications: [Notification]
    sortNotifications: [Notification]
  }
  type Notification {
    id: ID
    content: Content # 故意分出一個 Content 的 type 來增加複雜度
  }
  type Content {
    "推播標題"
    title: String
    "推播副標題"
    subTitle: String
    "推播新增時間"
    createTime: String
    "該推播是否已讀過"
    isRead: Boolean
  }
  type Post {
    id: ID!
    "文章標題"
    title: String!
    "文章內容"
    content: String!
    "文章作者"
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
    " 增加文章 "
    addPost(title: String, content: String, authorId: ID): [Post]
    " 刪除文章 "
    deletePost(postId: ID): [Post]
    " 更新文章 "
    updatePost(postId: ID, title: String, content: String, authorId: ID): [Post]
    " 增加評論 "
    addComment(postId: ID, comment: String, authorId: ID): [Comment]
    " 更新通知 "
    updateNotification(notificationId: ID): Result
  }

  type Query {
    allPost: [Post]
    post(postId: ID): Post
    user: User
  }
`

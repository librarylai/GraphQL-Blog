import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    "ID 不能為空"
    id: ID!
    "user 名稱"
    name: String!
    "使用這狀態"
    status: String!
    "性別"
    sex: Sex
    "文章"
    posts: [Post]
    "通知"
    notifications: [Notification]
    sortNotifications: [Notification]
  }

  enum Sex {
    Male
    Female
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

  type DUser {
    id: ID!
    login: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type DMarriage {
    id: ID!
    code: String!
    name: String!
    order: Int!
  }
  type DTag {
    id: ID!
    type: String!
    name: String!
    modifiable: Boolean!
  }

  # Mutation 特殊的 Type 代表 操作的進入點
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

  # Query 特殊的 Type 代表 查詢的進入點
  type Query {
    "我(登入者)"
    me: User
    "所有文章"
    allPost: [Post]
    "單筆文章"
    post(postId: ID): Post
    "單一使用者"
    user(userId: ID): User
    "dentall Demo"
    dentalUsers: [DUser]
    dentalMarriages: [DMarriage]
    dentalTags: [DTag]
  }
`

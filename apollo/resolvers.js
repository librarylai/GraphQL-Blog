import shortid from 'shortid'
import { ApolloError } from 'apollo-server-micro'
import { PubSub } from 'graphql-subscriptions'
function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start))
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0
  date.setHours(hour)
  return date
}
const setNotificationList = () => {
  let mockArr = [...new Array(10)].map(() => {
    const randomNum = Math.random() * 10000
    return {
      id: shortid.generate(),
      content: {
        title: `Title:${randomNum}`,
        subTitle: `subTitle:${randomNum}`,
        createTime: randomDate(new Date(2020, 1, 1), new Date(), 0, 24),
        isRead: Math.random() * 10 > 5,
      },
    }
  })
  return mockArr
}

const pubsub = new PubSub()
const resolvers = {
  Query: {
    // 查看全部 文章
    allPost: async (root, args, context) => {
      return await context.blogDB.find().toArray()
    },
    post: async (root, args, context) => {
      const { postId } = args
      return await context.blogDB.find({ id: postId })
    },
    user: () => {
      return setNotificationList()
    },
  },
  User: {
    posts: async (parent, arg, context) => {
      let allUser = await context.userDB.find()
      return allUser.filter((user) => user.id === parent.authorId)
    },
    notifications: () => {
      return setNotificationList()
    },
  },
  Notification: {
    content: (parent) => {
      return parent.content
    },
  },
  Content: {
    title: (parent) => {
      return parent?.title
    },
    subTitle: (parent) => {
      return parent?.subTitle
    },
  },
  Post: {
    author: async (parent, arg, context) => {
      return await context.userDB.findOne({ id: parent.authorId })
    },
  },
  Mutation: {
    addPost: async (root, arg, context) => {
      try {
        const { title, content, authorId } = arg
        const params = {
          id: shortid.generate(), // 產生一個這篇文章的 uuid
          title, // 文章標題
          content, // 文章內容
          authorId, // 作者 id
        }
        // 塞進 mongoblogDB
        await context.blogDB.insertOne(params)
        return await context.blogDB.find().toArray()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    updatePost: async (root, arg, context) => {
      try {
        const { postId, title, content, authorId } = arg
        const params = {
          title,
          content,
          authorId,
        }
        // 塞進 mongoblogDB
        await context.blogDB.updateOne({ id: postId }, { $set: params })
        return await context.blogDB.find().toArray()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    deletePost: async (root, arg, context) => {
      try {
        const { postId } = arg
        // 塞進 mongoblogDB
        await context.blogDB.deleteOne({ id: postId })
        return await context.blogDB.find().toArray()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    // 增加評論
    addComment: async (root, arg, context) => {
      const { postId, comment, authorId } = arg
      const params = {
        id: shortid.generate(), // 產生一個這篇文章的 uuid
        postId, // 文章 id
        comment, // 評論
        authorId, // 作者 id
      }
      // 塞進 mongoblogDB comment table
      await context.commentDB.insertOne(params)
      pubsub.publish('COMMENT_ADDED', {
        commentAdded: { params },
      })
    },
    // 更新通知
    updateNotification: (root, arg) => {
      return true
    },
  },
}
export default resolvers

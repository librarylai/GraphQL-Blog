import shortid from 'shortid'
import { ApolloError } from 'apollo-server-micro'
const resolvers = {
  Query: {
    // 查看全部 文章
    viewAllPost: async (root, args, context) => {
      return await context.blogDB.find().toArray()
    },
    viewPost: async (root, args, context) => {
      const { postId } = args
      return await context.blogDB.find({ id: postId })
    },
  },
  User: {
    posts: async (parent, arg, context) => {
      let allUser = await context.userDB.find()
      return allUser.filter((user) => user.id === parent.authorId)
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
          id: shortid.generate(),
          title,
          content,
          authorId,
        }
        // 塞進 mongoblogDB
        const result = await context.blogDB.insertOne(params)
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
        const result = await context.blogDB.deleteOne({ id: postId })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },
}
export default resolvers

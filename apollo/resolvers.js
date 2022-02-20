import shortid from 'shortid'
import { ApolloError } from 'apollo-server-micro'
const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
    // 查看全部 文章
    viewAllBlogs: async (root, args, context) => {
      let allBlogs = await context.db.find().toArray()
      console.log('allBlogs', allBlogs)
      return allBlogs
    },
    viewPost: async (root, args, context) => {
      const { postId } = args
      let post = await context.db.find({ id: postId })
      console.log('post', post)
      return post
    },
  },
  User: {
    posts: async (parent, arg, context) => {
      let allBlogs = await context.db.find()
      return allBlogs.filter((blog) => blog.author.id === parent.id)
    },
  },
  Post: {
    // author: async (parent) => {
    //   let allUsers = await acontext.db.find()
    //   return allUsers.find((user) => user.id === parent.author.id)
    // },
  },
  Mutation: {
    addPost: async (root, arg, context) => {
      try {
        const { title, content } = arg
        const params = {
          id: shortid.generate(),
          title,
          content,
          authorId: 1, // 先都是自己
        }
        // 塞進 mongodb
        const result = await context.db.insertOne(params)
        console.log('result', result)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    deletePost: async (root, arg, context) => {
      try {
        const { postId } = arg
        // 塞進 mongodb
        const result = await context.db.deleteOne({ id: postId })
        console.log('result', result)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },
}
export default resolvers

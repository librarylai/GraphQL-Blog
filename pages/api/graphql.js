import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import { MongoClient } from 'mongodb'
let db
const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const uri = 'mongodb+srv://graphql-blog:9DuxZbdFfG1j1z1h@cluster0.hboxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbClient = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        await dbClient.connect()
        db = dbClient.db('graphql-blog') // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
      }
    }
    return { db: db.collection('blog') }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}
export default apolloServer.createHandler({ path: '/api/graphql' })
